import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HanbokDisplayTS from '../HanbokDisplayTS';

jest.mock('axios');
// Swiper 자체 동작은 제외하고 상세페이지의 선택/오류 처리만 검증한다.
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: any) => <div>{children}</div>,
  SwiperSlide: ({ children }: any) => <div>{children}</div>,
}), { virtual: true });
jest.mock('swiper', () => ({ Pagination: {}, Navigation: {} }), { virtual: true });
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/pagination', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });
jest.mock('../../general/RentalTemplate', () => () => null);
const get = axios.get as jest.Mock;

function mount() {
  return render(<MemoryRouter initialEntries={['/display/A001']}>
    <Link to="/display/A002">다른 상품</Link>
    <Routes>
      <Route path="/display/:id" element={<HanbokDisplayTS />} />
      <Route path="/main/all" element={<p>전체한복 목록</p>} />
    </Routes>
  </MemoryRouter>);
}

beforeEach(() => {
  get.mockReset();
  window.scrollTo = jest.fn();
  get.mockResolvedValue({ data: { display_code: 'A001' } });
});
afterEach(() => jest.useRealTimers());

test('빠진 번호를 건너뛰고 실제 번호를 선택하며 늦은 로딩에도 선택을 유지한다', async () => {
  mount();
  const thumb = await screen.findByAltText('A001 이미지 7 선택');
  fireEvent.load(thumb);
  fireEvent.load(screen.getByAltText('A001 이미지 1 선택'));
  fireEvent.load(screen.getByAltText('A001 이미지 3 선택'));
  fireEvent.load(thumb);
  expect(screen.getByAltText('A001 선택 이미지')).toHaveAttribute('src', expect.stringContaining('/7.jpg'));
  fireEvent.click(screen.getByAltText('A001 이미지 1 선택'));
  fireEvent.click(screen.getByRole('button', { name: '다음 이미지' }));
  expect(screen.getByAltText('A001 선택 이미지')).toHaveAttribute('src', expect.stringContaining('/3.jpg'));
  fireEvent.click(thumb);
  fireEvent.load(screen.getByAltText('A001 이미지 2 선택'));
  expect(screen.getByAltText('A001 선택 이미지')).toHaveAttribute('src', expect.stringContaining('/7.jpg'));
  expect(screen.getByRole('button', { name: '다음 이미지' })).toBeDisabled();
});

test('이미지가 전부 없으면 안내하며 undefined 파일은 요청하지 않는다', async () => {
  const { container } = mount();
  await screen.findByAltText('A001 이미지 1 선택');
  for (let num = 1; num <= 15; num++) fireEvent.error(screen.getByAltText(`A001 이미지 ${num} 선택`));
  expect(screen.getAllByText('등록된 이미지가 없습니다.')).toHaveLength(2);
  expect(container.querySelector('img[src*="undefined"]')).toBeNull();
});

test('404는 안내 후 2초 뒤 전체한복으로 이동한다', async () => {
  jest.useFakeTimers();
  get.mockRejectedValue({ response: { status: 404 } });
  mount();
  await act(async () => {});
  expect(screen.getByText('상품을 찾을 수 없습니다.')).toBeInTheDocument();
  act(() => { jest.advanceTimersByTime(2000); });
  expect(screen.getByText('전체한복 목록')).toBeInTheDocument();
});

test('서버 오류는 자동 이동하지 않고 재시도할 수 있다', async () => {
  get.mockRejectedValueOnce({ response: { status: 500 } });
  mount();
  expect(await screen.findByText('상품 정보를 불러오지 못했습니다.')).toBeInTheDocument();
  expect(screen.queryByText('2초 후 전체한복으로 이동합니다.')).toBeNull();
  fireEvent.click(screen.getByText('다시 시도'));
  expect(await screen.findByAltText('A001 이미지 1 선택')).toBeInTheDocument();
});

test('상품 변경 시 이미지 상태와 이전 404 이동 타이머를 버린다', async () => {
  jest.useFakeTimers();
  get.mockRejectedValueOnce({ response: { status: 404 } });
  mount();
  await act(async () => {});
  fireEvent.click(screen.getByText('다른 상품'));
  await act(async () => {});
  act(() => { jest.advanceTimersByTime(2000); });
  expect(screen.queryByText('전체한복 목록')).toBeNull();
  expect(screen.queryByAltText('A001 선택 이미지')).toBeNull();
});
