import logo from './logo.svg';
import './App.css';
import NavWind from './general/NavWind';
import Footer from './general/Footer';
import {Route, Routes } from 'react-router-dom';
import Marriage from './display/Marriage';
import Parent from './display/Parent';
import Guest from './display/Guest';
import Main from './display/Main';

function App() {

  return (
    <div className='flex flex-col h-screen justify-between'>

      <NavWind />

      <Routes>
        <Route path='/' element={<Main />}/>
        
        <Route path='/bride' props={'bride'} element={<Marriage />} />
        {/* 임시 */}
        <Route path='/:id'  element={<Parent keyword={'Parent props'} />} />
        <Route path='/guest' element={<Guest />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
