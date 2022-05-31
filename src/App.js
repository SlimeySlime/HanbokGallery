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
// import Nav2 from './general/Nav2';

function App() {
  const [allImageData, setImageData] = useState([]);

  useEffect(() => {
    axios.get(SERVER_PATH)
    .then((result) => {
      setImageData(result.data[0])
      console.log(result.data[0])
    })
  }, [])

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
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
