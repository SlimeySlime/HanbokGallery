import axios from 'axios';
import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import galleryReducer from './reducing/galleryRedux';

jest.mock('axios');
jest.mock('./display/Main', () => () => null);
jest.mock('display/MainDesigned', () => () => null);
jest.mock('display/HanbokDisplayTS', () => () => null);

const mockSetCookie = jest.fn();
let mockEventDate: string | undefined = '2026-10-10';
jest.mock('react-cookie', () => ({
  useCookies: () => [{ eventdate: mockEventDate }, mockSetCookie],
}));

beforeEach(() => {
  jest.clearAllMocks();
  mockEventDate = '2026-10-10';
});
afterEach(() => { jest.useRealTimers(); });

const displayedItem = {
  display_code: 'A001', hanbok_name1: '꽃 한복', available_size: '55',
  unavailable: false, rental_mode: 'delivery',
};

test.each(['/main/all', '/searchResult/꽃'])('조회 중 %s의 기존 카드를 유지하고 완료되면 같은 카드의 판정을 갱신한다', async route => {
  let finishStore!: (value: { data: object[] }) => void;
  const pendingStore = new Promise<{ data: object[] }>(resolve => { finishStore = resolve; });
  (axios.get as jest.Mock).mockImplementation((url: string, options?: any) => {
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [] });
    return options.params.rentalMode === 'store'
      ? pendingStore : Promise.resolve({ data: [displayedItem] });
  });
  const store = configureStore({ reducer: { gallery: galleryReducer } });
  render(<Provider store={store}><MemoryRouter initialEntries={[route]}><App /></MemoryRouter></Provider>);
  const image = await screen.findByAltText('[A001]');
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  const results = screen.getByRole('region', { name: '한복 조회 결과' });

  fireEvent.change(screen.getByRole('combobox', { name: '수령' }), { target: { value: 'store' } });
  expect(screen.getByRole('status')).toHaveTextContent('대여 가능 여부를 확인하는 중입니다.');
  expect(screen.getByAltText('[A001]')).toBe(image);
  expect(store.getState().gallery.galleryFiltered[0].rental_mode).toBe('delivery');
  expect(results).toHaveAttribute('aria-busy', 'true');
  expect(results).toHaveAttribute('inert');

  await act(async () => {
    finishStore({ data: [{ ...displayedItem, rental_mode: 'store', unavailable: true }] });
    await pendingStore;
  });
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
  expect(results).not.toHaveAttribute('inert');
  expect(screen.getByAltText('[A001]')).toBe(image);
  expect(screen.getByText(/대여가 어렵습니다/)).toBeInTheDocument();
});

test('조회 실패 시 이전 카드를 선택할 수 없고 재시도로 새 판정을 받아야 해제한다', async () => {
  let storeAttempts = 0;
  (axios.get as jest.Mock).mockImplementation((url: string, options?: any) => {
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [] });
    if (options.params.rentalMode !== 'store') return Promise.resolve({ data: [displayedItem] });
    storeAttempts += 1;
    return storeAttempts === 1 ? Promise.reject(new Error('Network error'))
      : Promise.resolve({ data: [{ ...displayedItem, rental_mode: 'store', unavailable: true }] });
  });
  const store = configureStore({ reducer: { gallery: galleryReducer } });
  render(<Provider store={store}><MemoryRouter initialEntries={['/main/all']}><App /></MemoryRouter></Provider>);
  const image = await screen.findByAltText('[A001]');
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  fireEvent.change(screen.getByRole('combobox', { name: '수령' }), { target: { value: 'store' } });
  expect(await screen.findByRole('alert')).toHaveTextContent('대여 가능 여부를 불러오지 못했습니다.');
  expect(screen.getByAltText('[A001]')).toBe(image);
  const results = screen.getByRole('region', { name: '한복 조회 결과' });
  expect(results).toHaveAttribute('inert');
  fireEvent.click(screen.getByRole('button', { name: '다시 시도' }));
  await waitFor(() => expect(results).not.toHaveAttribute('inert'));
  expect(storeAttempts).toBe(2);
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(store.getState().gallery.galleryFiltered[0].rental_mode).toBe('store');
});

test.each([
  [undefined, '2026-09-29', '20260918', '20261010'],
  ['2026-10-10', '2026-10-10', '20260929', '20261021'],
])('한국 새벽에 기본 날짜를 표시하되 기존 선택 날짜 %s는 보존한다', async (cookieDate, expected, start, end) => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-09-28T15:30:00Z'));
  mockEventDate = cookieDate;
  (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  const store = configureStore({ reducer: { gallery: galleryReducer } });
  render(<Provider store={store}><MemoryRouter initialEntries={['/main/all']}><App /></MemoryRouter></Provider>);

  expect(screen.getByTitle('행사날짜를 지정해주세요')).toHaveValue(expected);
  await waitFor(() => expect(axios.get).toHaveBeenCalledWith(
    expect.stringContaining('/gallery/filter/'),
    { params: { rentalStart: start, rentalEnd: end, eventDate: expected.replace(/-/g, ''), rentalMode: 'delivery' } },
  ));
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
});

test('수령 방식 전환은 새 조건으로 조회하고 늦은 이전 응답은 무시한다', async () => {
  let finishDelivery!: (value: { data: object[] }) => void;
  const deliveryResponse = new Promise<{ data: object[] }>(resolve => { finishDelivery = resolve; });
  (axios.get as jest.Mock).mockImplementation((url: string, options?: any) => {
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [] });
    if (url.endsWith('/gallery/filter/') && options.params.rentalMode === 'delivery') return deliveryResponse;
    if (url.endsWith('/gallery/filter/') && options.params.rentalMode === 'store') {
      return Promise.resolve({ data: [{ display_code: 'A001', unavailable: false, rental_mode: 'store' }] });
    }
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });
  const store = configureStore({ reducer: { gallery: galleryReducer } });

  render(<Provider store={store}><MemoryRouter initialEntries={['/main/all']}><App /></MemoryRouter></Provider>);

  await waitFor(() => expect((axios.get as jest.Mock).mock.calls.some(([, options]) =>
    options?.params?.rentalMode === 'delivery')).toBe(true));

  fireEvent.change(screen.getByRole('combobox', { name: '수령' }), { target: { value: 'store' } });

  await waitFor(() => expect(store.getState().gallery.galleryFiltered[0]?.rental_mode).toBe('store'));
  expect(mockSetCookie).toHaveBeenCalledWith('rentalMode', 'store', { path: '/' });
  const storeRequest = (axios.get as jest.Mock).mock.calls.find(([, options]) => options?.params?.rentalMode === 'store');
  expect(storeRequest[1].params).toEqual({
    rentalStart: '20260929', rentalEnd: '20261021', eventDate: '20261010', rentalMode: 'store',
  });

  await act(async () => {
    finishDelivery({ data: [{ display_code: 'A001', unavailable: true, rental_mode: 'delivery' }] });
    await deliveryResponse;
  });
  expect(store.getState().gallery.galleryFiltered[0]?.rental_mode).toBe('store');
});

test('구버전 서버가 매장 요청을 무시하면 대여 가능으로 표시하지 않는다', async () => {
  (axios.get as jest.Mock).mockImplementation((url: string, options?: any) => {
    if (url.endsWith('/gallery/')) return Promise.resolve({ data: [] });
    if (url.endsWith('/gallery/filter/') && options.params.rentalMode === 'delivery') {
      return Promise.resolve({ data: [] });
    }
    if (url.endsWith('/gallery/filter/') && options.params.rentalMode === 'store') {
      return Promise.resolve({ data: [{ display_code: 'A001', unavailable: false }] });
    }
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });
  const store = configureStore({ reducer: { gallery: galleryReducer } });

  render(<Provider store={store}><MemoryRouter initialEntries={['/main/all']}><App /></MemoryRouter></Provider>);
  fireEvent.change(screen.getByRole('combobox', { name: '수령' }), { target: { value: 'store' } });

  expect(await screen.findByRole('alert')).toHaveTextContent('매장 판정을 지원하는 API 응답이 아닙니다.');
  expect(store.getState().gallery.galleryFiltered).toEqual([]);
});
