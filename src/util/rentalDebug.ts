import { Gallery_Item } from 'domain/gallery_item';

export interface HanbokStock {
  barcode: string;
  name: string | null;
  stock: number | null;
}

export interface RentalRecord {
  hanbok_barcode: string | null;
  rental_date: string | null;
  event_date: string | null;
  return_date: string | null;
}

export interface RentalRecordStatus extends RentalRecord {
  counted: boolean;
  reason: string;
}

export interface ComponentStatus {
  position: number;
  barcode: string;
  name: string;
  stock: number | null;
  rentals: RentalRecordStatus[];
  countedRentalCount: number;
  checkedByServer: boolean;
  exhausted: boolean | null;
  note: string | null;
}

export interface RentalDebugItem {
  gallery: Gallery_Item;
  serverUnavailable: boolean | null;
  components: ComponentStatus[];
  reason: string;
  needsReview: boolean;
}

type RentalMode = 'delivery' | 'store';

const parseRentalDate = (value: string | null) => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!/^\d{8}$/.test(trimmed) && !/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  const compact = trimmed.replace(/-/g, '');
  const year = Number(compact.slice(0, 4));
  const month = Number(compact.slice(4, 6));
  const day = Number(compact.slice(6, 8));
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date;
};

const rentalStatus = (record: RentalRecord, selectedDate: Date | null, mode: RentalMode): RentalRecordStatus => {
  if (mode === 'delivery') return { ...record, counted: true, reason: '택배: 조회 기간의 대여를 모두 집계' };

  const rentedOn = parseRentalDate(record.rental_date);
  if (!rentedOn) return { ...record, counted: true, reason: '대여일 확인 불가: 안전하게 집계' };
  if (!selectedDate || rentedOn >= selectedDate) {
    return { ...record, counted: true, reason: '행사일 당일·이후 대여: 기존 방식으로 집계' };
  }

  const returnedOn = parseRentalDate(record.return_date);
  if (!returnedOn) return { ...record, counted: true, reason: '반납일 확인 불가: 안전하게 집계' };

  const readyOn = new Date(returnedOn);
  readyOn.setUTCDate(readyOn.getUTCDate() + 3);
  const readyDate = readyOn.toISOString().slice(0, 10);
  return readyOn >= selectedDate
    ? { ...record, counted: true, reason: `반납일+3일 (${readyDate})이 행사일과 겹쳐 집계` }
    : { ...record, counted: false, reason: `반납일+3일 (${readyDate})이 행사일 전이라 제외` };
};

/** Explain the server's stock checks for each nonempty component barcode (1–3). */
export function buildRentalDebugItems(
  galleryItems: Gallery_Item[],
  filteredItems: Gallery_Item[],
  hanboks: HanbokStock[],
  rentalRecords: RentalRecord[],
  selectedDateValue: string,
  rentalMode: RentalMode,
): RentalDebugItem[] {
  const selectedDate = parseRentalDate(selectedDateValue);
  const filteredByCode = new Map(filteredItems.map(item => [item.display_code, item]));
  const stockByBarcode = new Map(hanboks.map(item => [item.barcode, item]));
  const rentalsByBarcode = new Map<string, RentalRecordStatus[]>();

  rentalRecords.forEach(record => {
    if (!record.hanbok_barcode) return;
    const records = rentalsByBarcode.get(record.hanbok_barcode) || [];
    records.push(rentalStatus(record, selectedDate, rentalMode));
    rentalsByBarcode.set(record.hanbok_barcode, records);
  });

  return galleryItems.map(gallery => {
    const filtered = filteredByCode.get(gallery.display_code);
    const components: ComponentStatus[] = [];

    for (let position = 1; position <= 5; position++) {
      const barcode = (gallery[`hanbok_barcode${position}` as keyof Gallery_Item] as string | null) || '';
      if (!barcode) continue;

      const item = stockByBarcode.get(barcode);
      const rentals = rentalsByBarcode.get(barcode) || [];
      const countedRentalCount = rentals.filter(rental => rental.counted).length;
      const stock = item?.stock ?? null;
      const checkedByServer = position <= 3 && !!item;
      const exhausted = stock === null ? null : countedRentalCount >= stock;
      let note: string | null = null;

      if (!item) note = '재고 목록에서 바코드를 찾지 못함';
      else if (position > 3) note = '현재 서버 판정에서 4·5번 구성품 제외';
      else if (stock === null) note = '재고 수량이 비어 있음';

      components.push({
        position,
        barcode,
        name: (gallery[`hanbok_name${position}` as keyof Gallery_Item] as string | null) || item?.name || barcode,
        stock,
        rentals,
        countedRentalCount,
        checkedByServer,
        exhausted,
        note,
      });
    }

    const countedReasons = components
      .filter(component => component.checkedByServer && component.exhausted)
      .map(component => `${component.position}번 ${component.name} (${component.countedRentalCount}/${component.stock})`);
    const hasExcludedExhaustedComponent = components.some(component => !component.checkedByServer && component.exhausted);
    const hasUnknownStock = components.some(component => component.stock === null);
    const hasUnknownDate = components.some(component => component.rentals.some(rental => rental.reason.includes('확인 불가')));

    let reason: string;
    if (!filtered) reason = '날짜별 상품 응답에서 찾지 못해 판정 확인 불가';
    else if (filtered.unavailable && countedReasons.length) reason = `재고 소진: ${countedReasons.join(', ')}`;
    else if (filtered.unavailable) reason = '서버는 대여 불가로 표시했으나 집계에서 이유를 찾지 못함';
    else if (countedReasons.length) reason = '집계상 재고 소진이지만 서버는 대여 가능으로 표시함';
    else if (hasExcludedExhaustedComponent) reason = '재고 소진 구성품이 있지만 현재 서버 판정에서 제외됨';
    else reason = '조회 기간 내 재고 소진으로 판정된 구성품 없음';

    return {
      gallery: { ...gallery, unavailable: filtered?.unavailable ?? false },
      serverUnavailable: filtered?.unavailable ?? null,
      components,
      reason,
      needsReview: !filtered || hasExcludedExhaustedComponent || hasUnknownStock || hasUnknownDate ||
        (filtered.unavailable !== (countedReasons.length > 0)),
    };
  });
}
