import React from 'react';
import './App.css';
import { GALLERY_FILTER_PATH, GALLERY_PATH } from './config/Config';
import { getKoreanToday, getRentalDateRange } from 'util/rentalDate';
import axios from 'axios';
import Footer from './general/Footer';
import { Route, Routes, useMatch } from 'react-router-dom';
import Main from './display/Main';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setHanbok, setRental, setStore } from './reducing/rentalDispatch';
import { setGalleryInfos, setGalleryFiltered } from './reducing/galleryRedux';
import SearchResult from './display/SearchResult';
import { useCookies } from 'react-cookie';
import { HiArrowUp } from 'react-icons/hi';
import WanringTooltip from './general/WarningTooltip';
// import { Hanbok_Min_Rental} from './domain/rental_minimum_info';
// import HanbokDisplay from './display/HanbokDisplay';
import { Gallery_Item } from 'domain/gallery_item';
import TypeDisplay from 'display/TypeDisplay';
import HanbokDisplayTS from 'display/HanbokDisplayTS';
import MainDesigned from 'display/MainDesigned';
import TopNav from 'general/TopNav';

// Keep the diagnostic page and its API calls out of production bundles.
const RentalDebugPage = process.env.NODE_ENV === 'development'
  ? React.lazy(() => import('display/RentalDebugPage'))
  : null;


// import Nav2 from './general/Nav2';
function App() {
  const dispatch = useDispatch()
  const [cookie, setCookie] = useCookies(['eventdate', 'rentalMode']);
  const [eventDate, setEventDate] = useState<string>(() =>
    typeof cookie.eventdate === 'string' ? cookie.eventdate : getKoreanToday()
  );
  const [rentalMode, setRentalMode] = useState<'delivery' | 'store'>(() =>
    cookie.rentalMode === 'store' ? 'store' : 'delivery'
  );
  const [rentalStatus, setRentalStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [rentalError, setRentalError] = useState('');
  const [rentalRetry, setRentalRetry] = useState(0);
  const [warningVisible, setWarningVisible] = useState(cookie.eventdate === undefined);
  const categoryRoute = useMatch('/main/:type');
  const searchRoute = useMatch('/searchResult/:keywords');
  const blockResults = Boolean(categoryRoute || searchRoute) && rentalStatus !== 'ready';

  useEffect(() => {
    axios.get(GALLERY_PATH).then((result) => {
      dispatch(setGalleryInfos(result.data));
      console.log('all Gallery / Store data', result.data);
    });
  }, [dispatch])

  useEffect(() => {
    const range = getRentalDateRange(eventDate);
    if (!range) {
      setRentalStatus('error');
      setRentalError('행사날짜를 다시 선택해주세요.');
      return;
    }

    let active = true;

    setRentalStatus('loading');
    setRentalError('');
    axios.get<Gallery_Item[]>(GALLERY_FILTER_PATH, {
      params: {
        rentalStart: range.start,
        rentalEnd: range.end,
        eventDate: range.selected,
        rentalMode,
      },
    }).then((result) => {
      if (!active) return;
      if (!Array.isArray(result.data) ||
          (rentalMode === 'store' && result.data.some(item => item.rental_mode !== 'store'))) {
        throw new Error('매장 판정을 지원하는 API 응답이 아닙니다.');
      }
      dispatch(setGalleryFiltered(result.data));
      setRentalStatus('ready');
    }).catch((error) => {
      if (!active) return;
      setRentalStatus('error');
      setRentalError(error.message === '매장 판정을 지원하는 API 응답이 아닙니다.'
        ? error.message : '대여 가능 여부를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
    });

    return () => { active = false; };
  }, [eventDate, rentalMode, rentalRetry, dispatch]);

  // nav change event
  function changeEventDate(e: any) {
    const date = e.target.value
    if (date === eventDate) return;
    setRentalStatus('loading');
    setRentalError('');
    setCookie('eventdate', date, { path:'/' })
    setEventDate(date)
    if (date) setWarningVisible(false)
  }

  function changeRentalMode(e: any) {
    const mode = e.target.value === 'store' ? 'store' : 'delivery';
    if (mode === rentalMode) return;
    setRentalStatus('loading');
    setRentalError('');
    setCookie('rentalMode', mode, { path: '/' });
    setRentalMode(mode);
  }

  function setWarning(bool: boolean){
    setWarningVisible(bool)
  }

  function topArrow(){
    window.scrollTo(0, 0)
  }

  return (
    <div className='flex flex-col min-h-screen justify-between'>

      {/* <NavWind setEventDate={changeEventDate} eventDate={eventDate}/> */}
      <TopNav setEventDate={changeEventDate} eventDate={eventDate}
        rentalMode={rentalMode} setRentalMode={changeRentalMode}/>
      <div className="relative flex-1 min-h-[12rem]">
      <div role={categoryRoute || searchRoute ? 'region' : undefined}
        aria-label={categoryRoute || searchRoute ? '한복 조회 결과' : undefined}
        aria-busy={rentalStatus === 'loading'}
        {...(blockResults ? { inert: '' } : {})}>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/main' element={<MainDesigned />}/>
        <Route path='/main/:type' element={<TypeDisplay />} />
        {RentalDebugPage && (
          <Route path='/debug/rentals' element={
            <React.Suspense fallback={<p role="status">디버깅 페이지를 불러오는 중입니다.</p>}>
              <RentalDebugPage eventDate={eventDate} rentalMode={rentalMode} />
            </React.Suspense>
          } />
        )}
        <Route path='/display/:id' element={<HanbokDisplayTS />} />
        <Route path='/searchResult/:keywords' element={<SearchResult />} />
        {/* <Route path='/test' element={<TestingPage />} /> */}
      </Routes>
      </div>
      {blockResults && <div className={`absolute inset-0 z-10 bg-white/60 ${rentalStatus === 'loading' ? 'cursor-wait' : ''}`} aria-hidden="true" />}
      </div>

      {rentalStatus !== 'ready' && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
          <div role={rentalStatus === 'loading' ? 'status' : 'alert'} aria-atomic="true"
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-xl border border-teal-100 bg-white px-5 py-4 font-preten shadow-xl">
            {rentalStatus === 'loading' && (
              <span aria-hidden="true" className="h-5 w-5 shrink-0 rounded-full border-2 border-teal-200 border-t-teal-700 motion-safe:animate-spin" />
            )}
            <div>
              <p className={`text-sm font-semibold ${rentalStatus === 'error' ? 'text-red-700' : 'text-teal-900'}`}>
                {rentalStatus === 'loading' ? '대여 가능 여부를 확인하는 중입니다.' : rentalError}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {eventDate || '행사날짜 미선택'} · {rentalMode === 'store' ? '매장' : '택배'}
                {blockResults && ' · 확인이 끝나면 상품을 선택할 수 있어요.'}
              </p>
              {rentalStatus === 'error' && getRentalDateRange(eventDate) && (
                <button type="button" className="mt-2 rounded bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-teal-800"
                  onClick={() => { setRentalStatus('loading'); setRentalError(''); setRentalRetry(value => value + 1); }}>
                  다시 시도
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {warningVisible ? <WanringTooltip warningClose={setWarning}/> : '' }

      <div className='sticky m-2 bottom-2 right-2 w-10 h-10 bg-blue-500 opacity-75 text-white rounded-full z-50 '
        onClick={() => {topArrow()}}>
          <HiArrowUp className='p-1 w-10 h-10'/>
      </div>
      <Footer />

    </div>
  );
}

export default App;
