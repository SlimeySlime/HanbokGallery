import './App.css';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import {Route, Routes } from 'react-router-dom';
import Marriage from './display/Marriage';
import Parent from './display/Parent';
import TypeDisplay from './display/TypeDisplay';
import Main from './display/Main';
import Display from './display/Display';
import FontSheet from './general/FontSheet';
// import Nav2 from './general/Nav2';

function App() {

  return (
    <div className='flex flex-col min-h-screen '>

      <NavWind />
      {/* <Nav2 /> */}
      <Routes className='flex-1'>
        <Route path='/' element={<Main />}/>
        <Route path='/main/:type' element={<TypeDisplay />} />
        
        <Route path='/bride' props={'bride'} element={<Marriage />} />
        {/* 임시 */}
        {/* <Route path='/:id'  element={<Parent keyword={'Parent props'} />} /> */}
        <Route path='/parent'  element={<Parent />} />
        <Route path='/display/:id' element={<Display />} />
        <Route path='/fonts' element={<FontSheet />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
