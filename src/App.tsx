import React from 'react';
import './App.css';
import { DATE_ADD, DATE_TO_SQLSTRING, HANBOK_MAP, SERVER_PATH } from './general/Config';
import axios from 'axios';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import { Route, Routes } from 'react-router-dom';
// import TypeDisplay from './display/TypeDisplay';
import TypeDisplay from './display/TypeDisplay';
import Main from './display/Main';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHanbok, setRental, setStore } from './reducing/rentalDispatch';
import SearchResult from './display/SearchResult';
import { useCookies } from 'react-cookie';
import { HiArrowUp } from 'react-icons/hi';
import WanringTooltip from './general/WarningTooltip';
import {Hanbok_Min_Rental} from './domain/rental_minimum_info';
import HanbokDisplay from './display/HanbokDisplay';
import { Gallery_Item } from 'domain/gallery_item';


// import Nav2 from './general/Nav2';

function App() {
  const dispatch = useDispatch()
  const [allGalleryData, setGalleryData] = useState<Gallery_Item[]>([]);
  const [allHanbokData, setAllHanbokData] = useState([])

  const [eventDate, setEventDate] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['eventdate']);
  const [warningVisible, setWarningVisible] = useState(true);

  useEffect(() => {
    getAllHanbok()
    getStoreData()
    // setEventDate(new Date(cookie.eventdate))
    if (cookie.eventdate !== undefined){
      // console.log(cookie.eventdate)
      setWarningVisible(false)
      getRentalList(new Date(cookie.eventdate))
    }else{
      getRentalList(new Date())
    }
  }, [])

  function getStoreData() {
    axios.get(SERVER_PATH + '/gallery')
    .then((result) => {
        setGalleryData(result.data)
        dispatch(setStore(result.data))
        console.log('all Gallery / Store data', result.data)
        return result.data[0]
    })
  }

  function getAllHanbok() {
    axios.get(SERVER_PATH + '/hanbok')
    .then((result) => {
      dispatch(setHanbok(result.data))
      console.log('all hanbok data', result.data)
    })
  }

  function changeEventDate(e: any) {
    const date = e.target.value
    setCookie('eventdate', date, { path:'/' })
    if (date !== undefined) getRentalList(date)
    
  }
  // rentalList 조회 후 filter
  function getRentalList(date: Date){
      const start = DATE_ADD(date, -14)
      const startStr = DATE_TO_SQLSTRING(start)
      const end = DATE_ADD(date, 14)
      const endStr = DATE_TO_SQLSTRING(end)
      // console.log(startStr, endStr)
      axios.get(SERVER_PATH + '/rental', {
          params: {
              eventStart: startStr,
              eventEnd: endStr
          }
      }).then((result) => {
          console.log('rentalItems -5 to 8 ', result.data)
          // -5일 +8일로 필터
          let hanboks: Hanbok_Min_Rental[] = result.data;
          filterRental(hanboks, DATE_TO_SQLSTRING(DATE_ADD(date, -5)), DATE_TO_SQLSTRING(DATE_ADD(date, 8)))
      })
  }

  // ★ filtering
  function filterRental(rentals: Hanbok_Min_Rental[], start: string, end: string) {
      // const hanbokMap = HANBOK_MAP(hanboks)
      let cantRental:Hanbok_Min_Rental[] = []
      rentals.map((item) => {
          if (item.rentalDate >= start && item.returnDate <= end && item.rtGubun) {
              cantRental.push(item)
          }
      })
      dispatch(setRental(cantRental))
  }

  function setWarning(bool: boolean){
    setWarningVisible(bool)
  }

  function topArrow(){
    window.scrollTo(0, 0)
  }

  return (
    <div className='flex flex-col min-h-screen justify-between'>

      <NavWind setEventDate={changeEventDate} eventDate={eventDate}/>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/main/:type' element={<TypeDisplay />} />
        <Route path='/display/:id' element={<HanbokDisplay itemInfo={undefined} />} />
        {/* <Route path='/fonts' element={<FontSheet />} />
        <Route path='/test' element={<TestingPage />} /> */}
        <Route path='/searchResult/:keywords' element={<SearchResult />} />
      </Routes>
      
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
