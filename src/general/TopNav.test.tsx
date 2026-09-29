import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import TopNav from './TopNav';

let mockMobile = false;
jest.mock('util/useScreenSize', () => ({
  __esModule: true,
  default: () => mockMobile ? mobileSize : desktopSize,
}));
const desktopSize = { width: 1440, hegiht: 900 };
const mobileSize = { width: 390, hegiht: 844 };

function Location() {
  return <output data-testid="location">{useLocation().pathname}</output>;
}

function renderNav() {
  return render(<MemoryRouter initialEntries={['/main/all']}>
    <TopNav eventDate="2026-10-10" setEventDate={jest.fn()} rentalMode="delivery" setRentalMode={jest.fn()} />
    <Location />
  </MemoryRouter>);
}

beforeEach(() => {
  mockMobile = false;
  HTMLElement.prototype.scrollIntoView = jest.fn();
});

test.each([false, true])('검색창은 여러 단어 입력 중 같은 입력창과 포커스를 유지한다 (mobile=%s)', mobile => {
  mockMobile = mobile;
  renderNav();
  const input = screen.getByPlaceholderText('검색');
  userEvent.type(input, 'pink hanbok');
  expect(screen.getByPlaceholderText('검색')).toBe(input);
  expect(input).toHaveValue('pink hanbok');
  expect(input).toHaveFocus();
});

test('Enter와 검색 버튼은 검색어를 보존하고 특수문자를 포함한 절대 검색 경로로 이동한다', () => {
  renderNav();
  const input = screen.getByPlaceholderText('검색');
  userEvent.type(input, 'pink hanbok{enter}');
  expect(screen.getByTestId('location')).toHaveTextContent('/searchResult/pink%20hanbok');
  userEvent.clear(input);
  userEvent.type(input, '꽃/분홍 #1');
  userEvent.click(screen.getByRole('button', { name: '검색' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/searchResult/' + encodeURIComponent('꽃/분홍 #1'));
  expect(input).toHaveValue('꽃/분홍 #1');
});

test('한글 조합 중 Enter는 검색하지 않고 조합 완료 후 Enter로 검색한다', () => {
  renderNav();
  const input = screen.getByPlaceholderText('검색');
  fireEvent.compositionStart(input);
  fireEvent.change(input, { target: { value: '분홍 한복' } });
  fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', isComposing: true, keyCode: 229 });
  expect(screen.getByTestId('location')).toHaveTextContent('/main/all');
  fireEvent.compositionEnd(input);
  userEvent.type(input, '{enter}');
  expect(screen.getByTestId('location')).toHaveTextContent('/searchResult/' + encodeURIComponent('분홍 한복'));
});
