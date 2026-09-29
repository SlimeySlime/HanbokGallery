import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import galleryReducer, { setGalleryFiltered, setGalleryInfos } from 'reducing/galleryRedux';
import { Gallery_Item } from 'domain/gallery_item';
import SearchResult from './SearchResult';

test('검색 결과는 날짜·수령 방식이 적용된 서버 판정을 보여준다', async () => {
  const store = configureStore({ reducer: { gallery: galleryReducer } });
  const item = {
    display_code: 'A001', hanbok_name1: '꽃 한복', available_size: '55',
    unavailable: false,
  } as Gallery_Item;
  store.dispatch(setGalleryInfos([item]));
  store.dispatch(setGalleryFiltered([{ ...item, unavailable: true }]));

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/searchResult/꽃']}>
        <Routes><Route path="/searchResult/:keywords" element={<SearchResult />} /></Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(await screen.findByText(/대여가 어렵습니다/)).toBeInTheDocument();

  act(() => { store.dispatch(setGalleryFiltered([{ ...item, unavailable: false }])); });
  await waitFor(() => expect(screen.queryByText(/대여가 어렵습니다/)).not.toBeInTheDocument());
  expect(screen.getByText(/55 size/)).toBeInTheDocument();
});
