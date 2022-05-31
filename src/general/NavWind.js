// import logo from '../bdanlogo.svg';
import logo from '../logo_1.svg';
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';

const NavWind = () => {

    const [eventDate, setEventDate] = useState(null);
    // eventdate 쿠키
    const [cookie, setCookie, removeCookie] = useCookies(['eventdate']);
    const ver = process.env.NODE_ENV

    // 쿠키가 있으면 
    useEffect(() => {
        setEventDate(new Date(cookie.eventdate))
        // console.log('eventdate cookie', cookie.eventdate)
    }, [])

    // eventdate cookie가 생성되면 rentalList 새로고침 
    useEffect(() => {
        console.log('cookie : ', cookie);
    }, [cookie])

    function changeEventDate(e) {
        // console.log(e)
        setEventDate(new Date(e.target.value))
        setCookie('eventdate', e.target.value, { path:'/' })
    }

    return(
    <nav className="flex items-center justify-center flex-wrap bg-teal-800 p-6">
        <div className="flex items-center text-white mr-6">
            {/* <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> */}
            <img className='fill-white w-8 mr-2' src={logo} fill='#f4f4f4' alt=""/>
            <span className="font-dimibang text-3xl tracking-tight">
                <Link className="hover:text-green-500" to={'/'}>비단본가</Link>
                {/* <p className='text-sm font-sans'>process.env : {process.env.REACT_APP_SEARCH_PATH}</p> */}
            </span>
        </div>
        {/* 메뉴들 */}
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-lg lg:flex-grow">
                {/* 구형 */}
                {/* <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200 mr-4">
                    <NavLink to={'/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white")}>신부한복</NavLink>
                </p> */}
                 <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200 mr-4">
                    <NavLink to={'/main/all'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white")}>전체보기</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200 mr-4">
                    <NavLink to={'/main/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white")}>신부한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/main/parent'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>혼주한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/main/guest'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>하객한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/main/best'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>인기상품</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/fonts'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>폰트시트</NavLink>
                </p>
                <div className='inline-flex float-right items-center justify-center mobile:block mobile:float-left'>
                    {/* 행사날짜 툴팁 */}
                    {/* <div className='has-tooltip bg-blue-300'>툴팁테스트
                        <span className='tooltip border rounded p-1 mt-3 z-50 bg-white text-black'>tooltip testing</span>
                    </div> */}
                    <div className='mr-2 text-xl text-slate-100 font-katuri has-tooltip2'>행사날짜
                        {/* <span className='absolute tooltip2 mt-4 bg-black rounded'>행사날짜를 알려주세요</span> */}
                    </div>
                    <input className='pl-4 py-0.5 mr-2 rounded-md font-katuri mobile:inline-block' type="date" title='행사날짜를 지정해주세요' id='eventDate' name="" 
                        onChange={(e) => {changeEventDate(e)}} 
                        value={cookie.eventdate}/>
                    {/* 검색 */}
                    <div className='inline-flex border-blue-400 hover:shadow-md mobile:mt-4' >
                        {/* 아이콘 */}
                        <button>
                            <svg class="rounded-l-md w-8 h-8 bg-white text-gray-500 fill-slate-400" fill="currentColor2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </button>
                        <input className=' rounded-r-md focus:outline-none' id='search' type="text" placeholder='검색'/>
                    </div>
                
                </div>

            </div>
        {/* <div">
            <a href="#" class="inline-block text-sm px-4 py-2 leading-none 
            border rounded text-white border-white hover:border-transparent 
            hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">로그인 / 회원가입</a>
        </div> */}
        </div>
    </nav>
    )
}

export default NavWind