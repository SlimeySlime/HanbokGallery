import logo from '../logo_1.svg';
// import axios from 'axios';
// import { DATE_ADD, DATE_TO_SQLSTRING, HANBOK_MAP, SERVER_PATH } from './Config';
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { HiMenuAlt2 } from "react-icons/hi";
import SearchResult from 'display/SearchResult';

const NavWind = ({eventDate, setEventDate}) => {
    // eventdate 쿠키
    // const [eventDate, setEventDate] = useState(null);
    const [cookie, , ] = useCookies(['eventdate']);
    
    const [navVisible, setNavVisible] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate()

    function onOffNav(){
        setNavVisible(!navVisible)
    }

    const initialEventDate = () => {
        // return new Date()
        console.log('cookie.eventdate : ', cookie.eventdate)
        if (cookie.eventdate != undefined) {
            console.log('return cookie.eventdate')
            return cookie.eventdate
        }else{
            const now = new Date()
            const nowStr = now.toISOString().split('T')[0]
            return nowStr
        }
    }

    const searchKeyEvent =(e) => {
        if(e.key === 'Enter') {
            navigate(`searchResult/${searchKeyword}`)
        }
    }

    return(
    <nav className="flex flex-wrap stickyno items-center justify-between bg-teal-800 p-4 
                    mobile:p-2 mobile:sticky top-0 z-50 mobile:w-full">
        {/* 로고 */}
        <div className="flex items-center justify-center text-white mr-6">
            <Link className="hover:text-green-500" to={'/'}>
                <img className='fill-white w-8 mr-2 inline-block' src={logo} fill='#f4f4f4' alt=""/>
            </Link>
            <Link className="hover:text-green-500" to={'/'}>
                <span className="mobile:hidden inline-block leading-2 font-dimibang text-3xl tracking-tight">비단본가</span>
            </Link>
        </div>
        {/* 모바일 메뉴 */}
        <div className='hidden mobile:flex float-right'>
            <div className='flex items-center mr-1 text-preten text-xs text-white font-sans font-semibold'>
                행사날짜
            </div>
            {/* <p className='inline-block mr-2 text-white text-xs font-semibold '>행사날짜</p> */}
            <input className='pl-2 my-1 mr-2 w-36 rounded-md font-katuri mobile:inline-block'
                type="date" title='행사날짜를 지정해주세요' id='eventDate' name="eventDate" 
                onChange={(e) => {setEventDate(e)}} 
                value={initialEventDate()}/>
            <HiMenuAlt2 className='w-10 h-10 p-1' color='white' onClick={() => {onOffNav()}}/>
            <p className='inline text-white py-2 font-preten font-semibold' onClick={() => {onOffNav()}}>메뉴</p>
        </div>
        <div className={(navVisible ? 'left-0 ' : '-left-full' ) + ` fixed bottom-0 top-14 w-3/5 bg-teal-700 opacity-90 transition-left duration-500 sm:hidden`}>
            <ul className='p-2'>
                <p className="p-2 block text-teal-200 text-lg  border-b">
                    <NavLink to={'/main/all'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>전체보기</NavLink>
                </p>
                <p className="p-2 flex flex-1 text-teal-200 text-lg border-b">
                    <NavLink to={'/main/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>신부한복</NavLink>
                </p>
                <p className="p-2 block text-teal-200 text-lg border-b">
                    <NavLink to={'/main/parent'}
                        className={(state) => (state.isActive ? "text-white " : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>혼주한복</NavLink>
                </p>
                <p className="p-2 block text-teal-200 text-lg border-b">
                    <NavLink to={'/main/guest'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") } onClick={()=>{setNavVisible(false)}}>하객한복</NavLink>
                </p>
                <p className="hidden p-2 block2 text-teal-200 text-lg border-b">
                    <NavLink to={'/main/best'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") } onClick={()=>{setNavVisible(false)}}>인기상품</NavLink>
                </p>
                <div className='mt-4 text-base text-white font-sans font-semibold'>
                    행사날짜
                </div>
                <input className='pl-2 py-0.5 mr-2 rounded-md font-katuri mobile:inline-block' type="date" title='행사날짜를 지정해주세요' id='eventDate' name="" 
                    onChange={(e) => {setEventDate(e)}} 
                    // value={cookie.eventdate}/>
                    value={initialEventDate()}/>
                {/* 검색 -> 모바일에선 x */}
                <div className='mobile:hidden inline-flex border-blue-400 hover:shadow-md mobile:mt-4' >
                    <button>
                        <Link to={`searchResult/${searchKeyword}`}>
                            <svg class="rounded-l-md w-8 h-8 bg-white text-gray-500 fill-slate-400" fill="currentColor2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </button>
                    <input className=' rounded-r-md focus:outline-none' onKeyDown={() => {}} id='search' type="text" onChange={(e) => {setSearchKeyword(e.target.value)}} placeholder='검색'/>
                </div>
            </ul>
        </div>
        {/* 데스크톱 와이드 메뉴 */}
        <div className="w-auto block flex-grow items-center justify-center mobile:hidden">
        {/* <div className="block flex-grow w-full mobile:hidden"> */}
            <div class="inline-flex h-full text-lg lg:flex-grow">
                <p className="p-2 block sm:inline-block text-teal-200 mr-4">
                    <NavLink to={'/main/all'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200")}>전체보기</NavLink>
                </p>
                <p className="p-2 block sm:inline-block text-teal-200 mr-4">
                    <NavLink to={'/main/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200")}>신부한복</NavLink>
                </p>
                <p className="p-2 block sm:inline-block text-teal-200  mr-4">
                    <NavLink to={'/main/groom'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200")}>신랑한복</NavLink>
                </p>
                <p className="p-2 block sm:inline-block text-teal-200 mr-4">
                    <NavLink to={'/main/parent'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") }>혼주한복</NavLink>
                </p>
                <p className="p-2 block sm:inline-block text-teal-200 mr-4">
                    <NavLink to={'/main/guest'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") }>하객한복</NavLink>
                </p>
                <p className="p-2 hidden text-teal-200 mr-4">
                    <NavLink to={'/main/best'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") + ' text-lg font-preten'}>인기상품</NavLink>
                </p>
                <p className="p-1 hidden text-teal-200 mr-4">
                    <NavLink to={'/fonts'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") + ' text-sm font-preten' }>폰트시트</NavLink>
                </p>
                <p className="p-1 hidden text-teal-200 mr-4">
                    <NavLink to={'/test'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") + ' text-sm'  }>테스팅</NavLink>
                </p>
            </div>
            {/* 행사날짜 및 검색 */}
            <div className='inline-flex h-full p-2 float-right items-center mobile:block mobile:float-left'> 
                <label className='mr-2 text-xl text-slate-100 font-katuri has-tooltip2'>행사날짜</label>
                <input className='pl-4 py-0.5 mr-2 rounded-md font-katuri mobile:inline-block' type="date" title='행사날짜를 지정해주세요' id='eventDate' name="" 
                    onChange={(e) => {setEventDate(e)}} 
                    // value={cookie.eventdate}/>
                    value={initialEventDate()}/>
                {/* 검색 */}
                <div className='hiddeno inline-flex border-blue-400 hover:shadow-md mobile:mt-4' 
                    onKeyDown={(e) => searchKeyEvent(e)}>
                    <button>
                        <Link to={`searchResult/${searchKeyword}`}>
                            <svg class="rounded-l-md w-8 h-8 bg-white text-gray-500 fill-slate-400" fill="currentColor2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </Link>
                    </button>
                    <input className=' rounded-r-md focus:outline-none' 
                        onKeyDown={(e) => searchKeyEvent(e)} id='search' type="text" 
                        onChange={(e) => {setSearchKeyword(e.target.value)}} placeholder='검색'/>
                </div>
            </div>
        {/* <div">
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none 
            border rounded text-white border-white hover:border-transparent 
            hover:text-teal-500 hover:bg-white mt-4">로그인 / 회원가입</a>
        </div> */}
        </div>
        
    </nav>
    )
}

export default NavWind