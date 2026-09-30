import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import galleryReducer from './reducing/galleryRedux';

jest.mock('axios');
jest.mock('./display/Main', () => () => '메인 화면');
jest.mock('display/MainDesigned', () => () => null);
jest.mock('display/HanbokDisplayTS', () => () => null);
jest.mock('react-cookie', () => ({
  useCookies: () => [{ eventdate: '2026-09-30' }, jest.fn()],
}));

test('메인 화면을 렌더링하고 대여 조회를 완료한다', async () => {
  axios.get.mockResolvedValue({ data: [] });
  const store = configureStore({ reducer: { gallery: galleryReducer } });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('메인 화면')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/gallery/filter/'), expect.any(Object));
});
