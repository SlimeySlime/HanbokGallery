import axios from 'axios';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RentalDebugPage from './RentalDebugPage';

jest.mock('axios');
jest.mock('react-cookie', () => ({
  useCookies: () => [{ eventdate: '2026-10-10' }],
}));

test('선택한 행사일의 서버 판정과 구성품별 대여 현황을 표시한다', async () => {
  const gallery = {
    id: 1,
    display_code: 'A001',
    hanbok_name1: '테스트 한복',
    hanbok_barcode1: 'A',
    hanbok_barcode2: 'B',
    customer_type: '하객',
    available_size: '66',
  };
  (axios.get as jest.Mock).mockImplementation((url: string) => {
    if (url.endsWith('/gallery/filter/')) return Promise.resolve({ data: [{ ...gallery, unavailable: true }] });
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [gallery] });
    if (url.endsWith('/hanboks/')) return Promise.resolve({ data: [
      { barcode: 'A', name: '테스트 한복', stock: 1 },
      { barcode: 'B', name: '다른 한복', stock: 2 },
    ] });
    if (url.endsWith('/rentalItems/')) return Promise.resolve({ data: [{ hanbok_barcode: 'A', rental_date: '20261008', event_date: '20261010', return_date: '20261011' }] });
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });

  render(<MemoryRouter><RentalDebugPage /></MemoryRouter>);

  expect(await screen.findByText('서버 판정: 대여 불가')).toBeInTheDocument();
  expect(screen.getByText(/2026-09-29 ~ 2026-10-21/)).toBeInTheDocument();
  expect(screen.getByText(/재고 소진: 1번 테스트 한복 \(1\/1\)/)).toBeInTheDocument();

  fireEvent.click(screen.getByText('구성품별 대여 현황'));
  expect(screen.getByText('조회 기간 대여 1건 / 재고 1')).toBeInTheDocument();
  expect(screen.getByText(/대여일 20261008/)).toBeInTheDocument();

  const rentalRequest = (axios.get as jest.Mock).mock.calls.find(([url]) => url.endsWith('/rentalItems/'));
  expect(rentalRequest[1].params).toEqual({ rentalStart: '20260929', rentalEnd: '20261021' });
});
