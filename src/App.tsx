import React from 'react';
import './App.css';
import { DATE_ADD, DATE_TO_SQLSTRING, GALLERY_FILTER_PATH, GALLERY_PATH, HANBOK_MAP, SERVER_PATH } from './config/Config';
import axios from 'axios';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import { Route, Routes } from 'react-router-dom';
import Main from './display/Main';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setHanbok, setRental, setStore } from './reducing/rentalDispatch';
import { setRentals, setHanboks, setGalleryInfos, setRentalItems, setGalleryFiltered } from './reducing/galleryRedux';
import SearchResult from './display/SearchResult';
import { useCookies } from 'react-cookie';
import { HiArrowUp } from 'react-icons/hi';
import WanringTooltip from './general/WarningTooltip';
// import { Hanbok_Min_Rental} from './domain/rental_minimum_info';
// import HanbokDisplay from './display/HanbokDisplay';
import HanbokDisplay from 'display/HanbokDisplay';
import { Gallery_Item } from 'domain/gallery_item';
import { Rental_Item } from 'domain/rental_item';
import TypeDisplay from 'display/TypeDisplay';
import HanbokDisplayTS from 'display/HanbokDisplayTS';


// import Nav2 from './general/Nav2';
function App() {
  const dispatch = useDispatch()
  const [allGalleryData, setGalleryData] = useState<Gallery_Item[]>([]);
  const [allHanbokData, setAllHanbokData] = useState([])

  const [eventDate, setEventDate] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(['eventdate']);
  const [warningVisible, setWarningVisible] = useState(true);

  useEffect(() => {
    
    getGalleryItem()

    if (cookie.eventdate !== undefined){
      setWarningVisible(false)
      getRentalList(new Date(cookie.eventdate))
    }else{
      getRentalList(new Date())
    }
  }, [])

  function getGalleryItem() {
    axios.get(GALLERY_PATH)
    .then((result) => {
        setGalleryData(result.data)
        dispatch(setGalleryInfos(result.data))
        console.log('all Gallery / Store data', result.data)
        return result.data[0]
    })
  }

  // function getAllHanbok() {
  //   axios.get(SERVER_PATH + '/hanboks/all')
  //   .then((result) => {
  //     dispatch(setHanboks(result.data))
  //     console.log('all hanbok data', result.data)
  //   })
  // }
  // nav change event
  function changeEventDate(e: any) {
    const date = e.target.value
    setCookie('eventdate', date, { path:'/' })
    if (date !== undefined) getRentalList(date)
    
  }
  // rentalList 조회 후 filter
  function getRentalList(date: Date){
      const start = DATE_ADD(date, -5)
      const startStr = DATE_TO_SQLSTRING(start)
      const end = DATE_ADD(date, 8)
      const endStr = DATE_TO_SQLSTRING(end)
      axios.get(GALLERY_FILTER_PATH, {
          params: {
              rentalStart: startStr,
              rentalEnd: endStr
          }
      }).then((result) => {
          console.log(`rentalItems -5 ${startStr} to 8 ${endStr} `, result.data)
          let hanboks: Rental_Item[] = result.data;
          // dispatch(setRentalItems(result.data))
          dispatch(setGalleryFiltered(result.data))
      })
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
        {/* <Route path='/display/:id' element={<HanbokDisplay />} /> */}
        <Route path='/display/:id' element={<HanbokDisplayTS />} />
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
