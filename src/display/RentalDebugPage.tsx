import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_FILTER_PATH, GALLERY_PATH, IMAGE_PATH, SERVER_PATH } from 'config/Config';
import { getRentalDateRange } from 'util/rentalDate';
import { Gallery_Item } from 'domain/gallery_item';
import { buildRentalDebugItems, HanbokStock, RentalDebugItem, RentalRecord } from 'util/rentalDebug';

type DisplayFilter = 'all' | 'unavailable' | 'review';

const formatSqlDate = (value: string) => value.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');

type RentalDebugPageProps = {
  eventDate: string;
  rentalMode: 'delivery' | 'store';
};

const RentalDebugPage = ({ eventDate: selectedDate, rentalMode }: RentalDebugPageProps) => {
  const [items, setItems] = useState<RentalDebugItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<DisplayFilter>('all');
  const [keyword, setKeyword] = useState('');

  const range = useMemo(() => getRentalDateRange(selectedDate), [selectedDate]);

  useEffect(() => {
    if (!range) {
      setItems([]);
      setError('행사날짜가 비어 있거나 올바르지 않습니다. 상단에서 날짜를 선택하세요.');
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError('');
    setItems([]);

    Promise.all([
      axios.get<Gallery_Item[]>(GALLERY_PATH),
      axios.get<Gallery_Item[]>(GALLERY_FILTER_PATH, {
        params: { rentalStart: range.start, rentalEnd: range.end,
          eventDate: range.selected, rentalMode },
      }),
      axios.get<HanbokStock[]>(`${SERVER_PATH}hanboks/`),
      axios.get<RentalRecord[]>(`${SERVER_PATH}rentalItems/`, {
        params: { rentalStart: range.start, rentalEnd: range.end },
      }),
    ]).then(([gallery, filtered, stock, rentals]) => {
      if (!active) return;
      if (![gallery.data, filtered.data, stock.data, rentals.data].every(Array.isArray)) {
        throw new Error('예상하지 못한 API 응답');
      }
      if (rentalMode === 'store' && filtered.data.some(item => item.rental_mode !== 'store')) {
        throw new Error('매장 판정을 지원하는 API 응답이 아닙니다.');
      }
      setItems(buildRentalDebugItems(gallery.data, filtered.data, stock.data, rentals.data,
        range.selected, rentalMode));
      setLoading(false);
    }).catch((reason) => {
      if (!active) return;
      setItems([]);
      setError(reason.message === '매장 판정을 지원하는 API 응답이 아닙니다.'
        ? reason.message : '대여 현황을 불러오지 못했습니다. API 연결을 확인한 뒤 다시 시도하세요.');
      setLoading(false);
    });

    return () => { active = false; };
  }, [range?.start, range?.end, range?.selected, rentalMode]);

  const visibleItems = items.filter(item => {
    if (filter === 'unavailable' && item.serverUnavailable !== true) return false;
    if (filter === 'review' && !item.needsReview) return false;
    const query = keyword.trim().toLowerCase();
    if (!query) return true;
    return [item.gallery.display_code, ...item.components.flatMap(component => [component.name, component.barcode])]
      .some(value => value?.toLowerCase().includes(query));
  });

  return (
    <main className="container mx-auto px-4 py-8 font-preten">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">한복 대여 현황 디버깅</h1>
        <p className="mt-2 text-sm text-slate-600">
          행사일 {selectedDate || '미선택'} · 수령 {rentalMode === 'store' ? '매장' : '택배'} · 조회 기간 {range ? `${formatSqlDate(range.start)} ~ ${formatSqlDate(range.end)}` : '확인 불가'}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          상단 행사날짜나 수령 방식을 바꾸면 갱신됩니다. {rentalMode === 'store'
            ? '매장 수령은 이전 대여의 반납일+3일이 행사일 전에 끝나면 재고 계산에서 제외합니다.'
            : '택배 수령은 조회 기간의 대여일 기록을 모두 합산합니다.'}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <label htmlFor="rental-debug-search" className="text-sm font-semibold">상품 검색</label>
        <input id="rental-debug-search" type="search" value={keyword}
          onChange={event => setKeyword(event.target.value)} placeholder="상품코드, 이름, 바코드"
          className="rounded border border-slate-300 px-3 py-2 text-sm" />
        <select aria-label="대여 상태 필터" value={filter}
          onChange={event => setFilter(event.target.value as DisplayFilter)}
          className="rounded border border-slate-300 px-3 py-2 text-sm">
          <option value="all">전체 한복</option>
          <option value="unavailable">대여 불가</option>
          <option value="review">확인 필요</option>
        </select>
        {!loading && !error && <span className="text-sm text-slate-600">{visibleItems.length} / {items.length}건</span>}
      </div>

      {loading && <p role="status">대여 현황을 불러오는 중입니다.</p>}
      {error && <p role="alert" className="rounded bg-red-50 p-4 text-red-700">{error}</p>}
      {!loading && !error && visibleItems.length === 0 && <p>조건에 맞는 한복이 없습니다.</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map(item => (
            <article key={item.gallery.id ?? item.gallery.display_code} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex gap-4 p-4">
                <img className="h-32 w-24 shrink-0 rounded object-cover"
                  src={IMAGE_PATH + `Store/[${item.gallery.display_code}]/1.jpg`}
                  alt={`[${item.gallery.display_code}] 한복`} loading="lazy" />
                <div className="min-w-0">
                  <Link to={`/display/${item.gallery.display_code}`} className="font-semibold text-teal-800 underline">
                    [{item.gallery.display_code}] {item.gallery.hanbok_name1}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{item.gallery.customer_type} · {item.gallery.available_size} size</p>
                  <p className={`mt-2 text-sm font-semibold ${item.serverUnavailable === true ? 'text-red-700' : 'text-teal-700'}`}>
                    서버 판정: {item.serverUnavailable === null ? '확인 불가' : item.serverUnavailable ? '대여 불가' : '대여 가능'}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{item.reason}</p>
                </div>
              </div>

              <details className="border-t border-slate-200 px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold">구성품별 대여 현황</summary>
                {item.components.length === 0 && <p className="mt-3 text-sm">등록된 구성품 바코드가 없습니다.</p>}
                <ul className="mt-3 space-y-3">
                  {item.components.map(component => (
                    <li key={`${component.position}-${component.barcode}`} className="rounded bg-slate-50 p-3 text-sm">
                      <p className="font-semibold">{component.position}번 {component.name}</p>
                      <p className="break-all text-slate-600">바코드 {component.barcode}</p>
                      <p>조회 기간 대여 {component.rentals.length}건 · 판정에 포함 {component.countedRentalCount}건 / 재고 {component.stock ?? '미확인'}</p>
                      <p className={component.exhausted ? 'text-red-700' : 'text-slate-600'}>
                        {component.exhausted === null ? '재고 판정 불가' : component.exhausted ? '재고 소진' : '재고 여유'}
                        {' · '}{component.checkedByServer ? '현재 서버 판정 대상' : '현재 서버 판정 제외'}
                      </p>
                      {component.note && <p className="text-amber-800">{component.note}</p>}
                      {component.rentals.length > 0 && (
                        <ul className="mt-2 list-inside list-disc text-slate-600">
                          {component.rentals.map((rental, index) => (
                            <li key={index}>
                              <span className={rental.counted ? 'text-slate-700' : 'text-amber-800'}>
                                [{rental.counted ? '집계' : '제외'}] {rental.reason}
                              </span>
                              <br />대여일 {rental.rental_date || '미기록'} · 행사일 {rental.event_date || '미기록'} · 반납일 {rental.return_date || '미기록'}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default RentalDebugPage;
