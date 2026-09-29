import axios from 'axios';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RentalDebugPage from './RentalDebugPage';

jest.mock('axios');

beforeEach(() => {
  (axios.get as jest.Mock).mockReset();
});

test('상단 행사날짜 변경을 같은 조회 범위로 반영하고 빈 날짜는 요청하지 않는다', async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  const { rerender } = render(<MemoryRouter><RentalDebugPage eventDate="2026-10-10" rentalMode="delivery" /></MemoryRouter>);
  await screen.findByText('조건에 맞는 한복이 없습니다.');
  (axios.get as jest.Mock).mockClear();

  rerender(<MemoryRouter><RentalDebugPage eventDate="2027-01-01" rentalMode="store" /></MemoryRouter>);
  await waitFor(() => expect(axios.get).toHaveBeenCalledWith(
    expect.stringContaining('/gallery/filter/'),
    { params: { rentalStart: '20261221', rentalEnd: '20270112', eventDate: '20270101', rentalMode: 'store' } },
  ));
  await screen.findByText('조건에 맞는 한복이 없습니다.');
  expect(screen.getByText(/행사일 2027-01-01 · 수령 매장/)).toBeInTheDocument();
  (axios.get as jest.Mock).mockClear();

  rerender(<MemoryRouter><RentalDebugPage eventDate="" rentalMode="store" /></MemoryRouter>);
  expect(await screen.findByRole('alert')).toHaveTextContent('행사날짜가 비어 있거나 올바르지 않습니다.');
  expect(axios.get).not.toHaveBeenCalled();
});

test('2번 바코드가 비어도 서버 판정과 1번 구성품의 재고 소진 이유를 일치시킨다', async () => {
  const gallery = {
    id: 1,
    display_code: 'A001',
    hanbok_name1: '테스트 한복',
    hanbok_barcode1: 'A',
    hanbok_barcode2: '',
    customer_type: '하객',
    available_size: '66',
  };
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    if (url.endsWith('/gallery/filter/')) return Promise.resolve({ data: [{ ...gallery, unavailable: true }] });
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [gallery] });
    if (url.endsWith('/hanboks/')) return Promise.resolve({ data: [
      { barcode: 'A', name: '테스트 한복', stock: 1 },
    ] });
    if (url.endsWith('/rentalItems/')) return Promise.resolve({ data: [{ hanbok_barcode: 'A', rental_date: '20261008', event_date: '20261010', return_date: '20261011' }] });
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });

  render(<MemoryRouter><RentalDebugPage eventDate="2026-10-10" rentalMode="delivery" /></MemoryRouter>);

  expect(await screen.findByText('서버 판정: 대여 불가')).toBeInTheDocument();
  expect(screen.getByText(/2026-09-29 ~ 2026-10-21/)).toBeInTheDocument();
  expect(screen.getByText(/재고 소진: 1번 테스트 한복 \(1\/1\)/)).toBeInTheDocument();

  fireEvent.click(screen.getByText('구성품별 대여 현황'));
  expect(screen.getByText('조회 기간 대여 1건 · 판정에 포함 1건 / 재고 1')).toBeInTheDocument();
  expect(screen.getByText(/대여일 20261008/)).toBeInTheDocument();
  expect(screen.getByText(/현재 서버 판정 대상/)).toBeInTheDocument();
  fireEvent.change(screen.getByRole('combobox', { name: '대여 상태 필터' }), { target: { value: 'review' } });
  expect(screen.getByText('조건에 맞는 한복이 없습니다.')).toBeInTheDocument();

  const rentalRequest = (axios.get as jest.Mock).mock.calls.find(([url]) => url.endsWith('/rentalItems/'));
  expect(rentalRequest[1].params).toEqual({ rentalStart: '20260929', rentalEnd: '20261021' });
  const filteredRequest = (axios.get as jest.Mock).mock.calls.find(([url]) => url.endsWith('/gallery/filter/'));
  expect(filteredRequest[1].params).toEqual({
    rentalStart: '20260929', rentalEnd: '20261021', eventDate: '20261010', rentalMode: 'delivery',
  });
});

test('매장 수령은 반납일이 충분히 이른 대여를 제외해 표시한다', async () => {
  const gallery = {
    id: 1, display_code: 'A001', hanbok_name1: '테스트 한복',
    hanbok_barcode1: 'A', hanbok_barcode2: 'B', customer_type: '하객', available_size: '66',
  };
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    if (url.endsWith('/gallery/filter/')) return Promise.resolve({ data: [{ ...gallery, unavailable: false, rental_mode: 'store' }] });
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [gallery] });
    if (url.endsWith('/hanboks/')) return Promise.resolve({ data: [
      { barcode: 'A', name: '테스트 한복', stock: 1 },
      { barcode: 'B', name: '다른 한복', stock: 2 },
    ] });
    if (url.endsWith('/rentalItems/')) return Promise.resolve({ data: [
      { hanbok_barcode: 'A', rental_date: '20261001', event_date: '20261002', return_date: '20261006' },
    ] });
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });

  render(<MemoryRouter><RentalDebugPage eventDate="2026-10-10" rentalMode="store" /></MemoryRouter>);

  expect(await screen.findByText('서버 판정: 대여 가능')).toBeInTheDocument();
  expect(screen.getByText(/수령 매장/)).toBeInTheDocument();
  fireEvent.click(screen.getByText('구성품별 대여 현황'));
  expect(screen.getByText('조회 기간 대여 1건 · 판정에 포함 0건 / 재고 1')).toBeInTheDocument();
  expect(screen.getByText(/\[제외\].*행사일 전이라 제외/)).toBeInTheDocument();
});
