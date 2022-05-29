import logo from './logo.svg';
import './App.css';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import {Route, Routes } from 'react-router-dom';
import Marriage from './display/Marriage';
import Parent from './display/Parent';
import Guest from './display/Guest';
import Main from './display/Main';
import Display from './display/Display';
import useEmblaCarousel from 'embla-carousel-react'
import FontSheet from './general/FontSheet';

function App() {

  return (
    <div className='flex flex-col min-h-screen '>

      <NavWind />
      <Routes className='flex-1'>
        <Route path='/' element={<Main />}/>
        
        <Route path='/bride' props={'bride'} element={<Marriage />} />
        {/* 임시 */}
        {/* <Route path='/:id'  element={<Parent keyword={'Parent props'} />} /> */}
        <Route path='/parent'  element={<Parent />} />
        <Route path='/guest' element={<Guest />} />
        <Route path='/display/:id' element={<Display />} />
        <Route path='/fonts' element={<FontSheet />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
