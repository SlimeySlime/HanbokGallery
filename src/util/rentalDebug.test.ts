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
  const result = buildRentalDebugItems([product()], [product({ unavailable: true })], stock, [rental])[0];

  expect(result.serverUnavailable).toBe(true);
  expect(result.reason).toContain('1번 첫 번째 한복 (1/1)');
  expect(result.components[0].rentals[0].rental_date).toBe('20261008');
  expect(result.components[0].checkedByServer).toBe(true);
  expect(result.needsReview).toBe(false);
});

test('2번 바코드가 빈 상품은 소진된 1번 구성품이 현재 검사에서 빠졌음을 표시한다', () => {
  const result = buildRentalDebugItems(
    [product({ hanbok_barcode2: '' })],
    [product({ hanbok_barcode2: '', unavailable: false })],
    stock,
    [rental],
  )[0];

  expect(result.components[0].exhausted).toBe(true);
  expect(result.components[0].checkedByServer).toBe(false);
  expect(result.reason).toContain('현재 서버 판정에서 제외');
  expect(result.needsReview).toBe(true);
});

test('날짜별 API에 없는 상품을 대여 가능이라고 단정하지 않는다', () => {
  const result = buildRentalDebugItems([product()], [], stock, [rental])[0];

  expect(result.serverUnavailable).toBeNull();
  expect(result.reason).toContain('판정 확인 불가');
  expect(result.needsReview).toBe(true);
});
