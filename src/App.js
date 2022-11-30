import './App.css';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import {Route, Routes } from 'react-router-dom';
// import Marriage from './display/Marriage';
import TypeDisplay from './display/TypeDisplay';
import Main from './display/Main';
import Display from './display/Display';
import FontSheet from './general/FontSheet';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DATE_ADD, DATE_TO_SQLSTRING, HANBOK_MAP, SERVER_PATH } from './general/General';
import { useDispatch } from 'react-redux';
import {setHanbok, setRental, setStore} from './reducing/rentalDispatch';
import TestingPage from './general/TestingPage';
import SearchResult from './display/SearchResult';
import { useCookies } from 'react-cookie';
import CookieWanring from './general/CookieWarning';
import {  } from "react-icons/ai";
import { HiArrowUp } from 'react-icons/hi';
import { Login } from './user/login';

// import Nav2 from './general/Nav2';

function App() {
  const dispatch = useDispatch()
  const [allStoreData, setStoreData] = useState([]);
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
    axios.get(SERVER_PATH)
    .then((result) => {
        const storeResult = result.data[0]
        // redux 하면서 사실상 사용안함
        setStoreData(result.data[0]);
        console.log('all Store data', result.data[0])
        
        dispatch(setStore(result.data[0]))
        return result.data[0]
    })
  }

  function getAllHanbok() {
    axios.get(SERVER_PATH + '/hanbok')
    .then((result) => {
      const hanbokData = result.data[0]
      console.log('all hanbok data', hanbokData)
      setAllHanbokData(result.data[0])
      dispatch(setHanbok(result.data[0]))
      // can't redux map -> dispatch(setHanbok(hanbokMapping(hanbokData))) (x)
      return result.data[0]
    })
  }

  function changeEventDate(e) {
    const date = e.target.value
    setCookie('eventdate', date, { path:'/' })
    // console.log('changeEventDate', date)
    if (date !== undefined) getRentalList(date)
    
  }
  // rentalList 조회 후 filter
  function getRentalList(date){
      const start = DATE_ADD(date, -14)
      const startStr = DATE_TO_SQLSTRING(start)
      const end = DATE_ADD(date, 14)
      const endStr = DATE_TO_SQLSTRING(end)
      // console.log(startStr, endStr)
      axios.get(SERVER_PATH + '/rentalItems', {
          params: {
              startDate: startStr,
              endDate: endStr
          }
      }).then((result) => {
          console.log(result.data[0])
          // -5일 ~ 8일로 필터
          filterRental(result.data[0], DATE_TO_SQLSTRING(DATE_ADD(date, -5)), DATE_TO_SQLSTRING(DATE_ADD(date, 8)))
      })
  }
  // ★ filtering
  // 필터링 정확도는 나중에 체크하고 일단 redux
  function filterRental(rentals, start, end) {
      // const hanbokMap = HANBOK_MAP(hanboks)
      let cantRental = []
      rentals.map((item) => {
          if (item.rt_rdate >= start && item.rt_bdate <= end && item.rt_Gubun != null) {
              cantRental.push(item)
          }
      })
      // console.log('filterd cant\' rental', cantRental)
      dispatch(setRental(cantRental))
  }

  function setWarning(bool){
    setWarningVisible(bool)
  }

  function topArrow(){
    window.scrollTo(0, 0)
  }

  return (
    <div className='flex flex-col min-h-screen justify-between'>

      <NavWind setEventDate={changeEventDate} eventDate={eventDate}/>
      {/* <Nav2 /> */}
      <Routes className='flex-1'>
        <Route path='/' element={<Main />}/>
        <Route path='/main/:type' element={<TypeDisplay imageList={allStoreData} />} />
        <Route path='/display/:id' element={<Display />} />
        {/* <Route path='/fonts' element={<FontSheet />} />
        <Route path='/test' element={<TestingPage />} /> */}
        <Route path='/searchResult/:keywords' element={<SearchResult />} />
        <Route path='/user/login' element={<Login />} />
      </Routes>
      
      {/* eventdate warning */}
      {warningVisible ? <CookieWanring warningClose={setWarning}/> : '' }

      <div className='sticky m-2 bottom-2 right-2 w-10 h-10 bg-blue-500 opacity-75 text-white rounded-full z-50 '
        onClick={() => {topArrow()}}>
          <HiArrowUp className='p-1 w-10 h-10'/>
      </div>
      <Footer />

    </div>
  );
}

export default App;
