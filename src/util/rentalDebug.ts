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

export interface ComponentStatus {
  position: number;
  barcode: string;
  name: string;
  stock: number | null;
  rentals: RentalRecord[];
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

/** Display the existing server rule as written, including its barcode2 guard. */
export function buildRentalDebugItems(
  galleryItems: Gallery_Item[],
  filteredItems: Gallery_Item[],
  hanboks: HanbokStock[],
  rentalRecords: RentalRecord[],
): RentalDebugItem[] {
  const filteredByCode = new Map(filteredItems.map(item => [item.display_code, item]));
  const stockByBarcode = new Map(hanboks.map(item => [item.barcode, item]));
  const rentalsByBarcode = new Map<string, RentalRecord[]>();

  rentalRecords.forEach(record => {
    if (!record.hanbok_barcode) return;
    const records = rentalsByBarcode.get(record.hanbok_barcode) || [];
    records.push(record);
    rentalsByBarcode.set(record.hanbok_barcode, records);
  });

  return galleryItems.map(gallery => {
    const filtered = filteredByCode.get(gallery.display_code);
    const secondBarcodeIsNotEmpty = gallery.hanbok_barcode2 !== '';
    const components: ComponentStatus[] = [];

    for (let position = 1; position <= 5; position++) {
      const barcode = (gallery[`hanbok_barcode${position}` as keyof Gallery_Item] as string | null) || '';
      if (!barcode) continue;

      const item = stockByBarcode.get(barcode);
      const rentals = rentalsByBarcode.get(barcode) || [];
      const stock = item?.stock ?? null;
      const checkedByServer = position <= 3 && secondBarcodeIsNotEmpty && !!item;
      const exhausted = stock === null ? null : rentals.length >= stock;
      let note: string | null = null;

      if (!item) note = '재고 목록에서 바코드를 찾지 못함';
      else if (position > 3) note = '현재 서버 판정에서 4·5번 구성품 제외';
      else if (!secondBarcodeIsNotEmpty) note = '현재 서버 코드의 2번 바코드 조건으로 검사 제외';
      else if (stock === null) note = '재고 수량이 비어 있음';

      components.push({
        position,
        barcode,
        name: (gallery[`hanbok_name${position}` as keyof Gallery_Item] as string | null) || item?.name || barcode,
        stock,
        rentals,
        checkedByServer,
        exhausted,
        note,
      });
    }

    const countedReasons = components
      .filter(component => component.checkedByServer && component.exhausted)
      .map(component => `${component.position}번 ${component.name} (${component.rentals.length}/${component.stock})`);
    const hasExcludedExhaustedComponent = components.some(component => !component.checkedByServer && component.exhausted);
    const hasUnknownStock = components.some(component => component.stock === null);

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
      needsReview: !filtered || hasExcludedExhaustedComponent || hasUnknownStock ||
        (filtered.unavailable !== (countedReasons.length > 0)),
    };
  });
}
