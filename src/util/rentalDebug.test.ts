import { Gallery_Item } from 'domain/gallery_item';
import { buildRentalDebugItems, HanbokStock, RentalRecord } from './rentalDebug';

const product = (fields: Partial<Gallery_Item> = {}): Gallery_Item => ({
  display_code: 'A001',
  hanbok_name1: '첫 번째 한복',
  hanbok_name2: '두 번째 한복',
  hanbok_barcode1: 'A',
  hanbok_barcode2: 'B',
  unavailable: false,
  ...fields,
} as Gallery_Item);

const stock: HanbokStock[] = [
  { barcode: 'A', name: '첫 번째 한복', stock: 1 },
  { barcode: 'B', name: '두 번째 한복', stock: 2 },
];

const rental: RentalRecord = {
  hanbok_barcode: 'A',
  rental_date: '20261008',
  event_date: '20261010',
  return_date: '20261011',
};

test('서버가 대여 불가로 표시한 구성품의 재고 소진 이유와 대여 날짜를 보여준다', () => {
  const result = buildRentalDebugItems([product()], [product({ unavailable: true })], stock, [rental], '20261010', 'delivery')[0];

  expect(result.serverUnavailable).toBe(true);
  expect(result.reason).toContain('1번 첫 번째 한복 (1/1)');
  expect(result.components[0].rentals[0].rental_date).toBe('20261008');
  expect(result.components[0].countedRentalCount).toBe(1);
  expect(result.components[0].checkedByServer).toBe(true);
  expect(result.needsReview).toBe(false);
});

test.each([1, 3])('2번 바코드가 비어도 %i번 구성품의 재고 소진을 불가 사유로 표시한다', (position) => {
  const gallery = product({
    hanbok_barcode1: '',
    hanbok_barcode2: '',
    [`hanbok_barcode${position}`]: 'A',
    [`hanbok_name${position}`]: '소진 한복',
  });
  const result = buildRentalDebugItems(
    [gallery],
    [{ ...gallery, unavailable: true }],
    stock,
    [rental],
    '20261010',
    'delivery',
  )[0];

  expect(result.components[0].exhausted).toBe(true);
  expect(result.components[0].checkedByServer).toBe(true);
  expect(result.components[0].note).toBeNull();
  expect(result.reason).toBe(`재고 소진: ${position}번 소진 한복 (1/1)`);
  expect(result.needsReview).toBe(false);
});

test('날짜별 API에 없는 상품을 대여 가능이라고 단정하지 않는다', () => {
  const result = buildRentalDebugItems([product()], [], stock, [rental], '20261010', 'delivery')[0];

  expect(result.serverUnavailable).toBeNull();
  expect(result.reason).toContain('판정 확인 불가');
  expect(result.needsReview).toBe(true);
});

test('매장은 이전 대여의 반납일+3일이 행사일 전에 끝나면 건수에서 제외한다', () => {
  const records = [
    { ...rental, return_date: '20261006' },
    { ...rental, return_date: '20261007' },
  ];
  const store = buildRentalDebugItems([product()], [product()], stock, records, '20261010', 'store')[0];
  const delivery = buildRentalDebugItems([product()], [product({ unavailable: true })], stock, records, '20261010', 'delivery')[0];

  expect(store.components[0].rentals.map(item => item.counted)).toEqual([false, true]);
  expect(store.components[0].countedRentalCount).toBe(1);
  expect(store.components[0].rentals[0].reason).toContain('행사일 전이라 제외');
  expect(delivery.components[0].countedRentalCount).toBe(2);
});

test('매장에서 반납일이 없으면 대여 건수를 보수적으로 포함한다', () => {
  const result = buildRentalDebugItems([product()], [product({ unavailable: true })], stock,
    [{ ...rental, return_date: null }], '20261010', 'store')[0];

  expect(result.components[0].countedRentalCount).toBe(1);
  expect(result.components[0].rentals[0].reason).toContain('반납일 확인 불가');
  expect(result.needsReview).toBe(true);
});
