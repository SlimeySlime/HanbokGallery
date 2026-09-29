import { getKoreanToday, getRentalDateRange } from './rentalDate';

test.each([
  ['2026-09-28T14:59:59Z', '2026-09-28'],
  ['2026-09-28T15:00:00Z', '2026-09-29'],
  ['2026-09-28T23:59:59Z', '2026-09-29'],
  ['2026-09-29T00:00:00Z', '2026-09-29'],
])('한국 자정과 오전 9시 전후의 오늘: %s → %s', (instant, expected) => {
  expect(getKoreanToday(new Date(instant))).toBe(expected);
});

test.each([
  ['2026-10-10', '20260929', '20261021'],
  ['2027-01-01', '20261221', '20270112'],
  ['2024-02-29', '20240218', '20240311'],
  ['2026-03-01', '20260218', '20260312'],
  ['2026-03-08', '20260225', '20260319'],
])('선택 날짜 %s의 ±11일은 달력 기준으로 계산한다', (date, start, end) => {
  expect(getRentalDateRange(date)).toEqual({ start, end, selected: date.replace(/-/g, '') });
});

test.each(['', '2026-02-29', '2026-04-31', '2026-13-01', '2026-1-01', '20261010', '0000-01-01'])(
  '유효하지 않은 행사날짜 %s는 조회 범위를 만들지 않는다', (date) => {
    expect(getRentalDateRange(date)).toBeNull();
  },
);
