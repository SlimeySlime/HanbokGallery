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
import { SERVER_PATH } from './general/General';
import { useDispatch } from 'react-redux';
import {setHanbok, setStore} from './reducing/rentalDispatch';
import TestingPage from './general/TestingPage';
// import Nav2 from './general/Nav2';

function App() {
  const dispatch = useDispatch()
  const [allStoreData, setStoreData] = useState([]);
  const [allHanbokData, setAllHanbokData] = useState([])

  useEffect(() => {
    axios.get(SERVER_PATH + '/hanbok')
    .then((result) => {
      const hanbokData = result.data[0]
      console.log('all hanbok data', hanbokData)
      setAllHanbokData(result.data[0])
      dispatch(setHanbok(result.data[0]))
      // can't redux map
      // dispatch(setHanbok(hanbokMapping(hanbokData)))
      // console.log('mapped hanbok', hanbokMapping(hanbokData))
    })

    // dispatch(setStore(getAllHanbok()))
    getAllHanbok()
  }, [])
  function getAllHanbok() {
    axios.get(SERVER_PATH)
    .then((result) => {
        setStoreData(result.data[0]);
        console.log('all Store data', result.data[0])
        dispatch(setStore(result.data[0]))
        // return result.data[0]
    })
}
  // 나중에 조회하기좋게 map으로 
  function hanbokMapping(hanbok){
    let hanbokMap = new Map()
    hanbok.map((item) => {
      hanbokMap[item.gs_name] = item
    })
    return hanbokMap
  }


  return (
    <div className='flex flex-col min-h-screen '>

      <NavWind />
      {/* <Nav2 /> */}
      <Routes className='flex-1'>
        <Route path='/' element={<Main />}/>
        {/* <Route path='/bride' props={'bride'} element={<Marriage />} /> */}
        {/* <Route path='/parent'  element={<Parent />} /> */}

        <Route path='/main/:type' element={<TypeDisplay />} />
        <Route path='/display/:id' element={<Display />} />
        <Route path='/fonts' element={<FontSheet />} />
        <Route path='/test' element={<TestingPage />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
