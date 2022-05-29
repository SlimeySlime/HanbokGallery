import logo from '../bdanlogo.svg';
import logo2 from '../logo_2_tp.png'
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavWind = () => {

    return(
    <nav className="flex items-center justify-center flex-wrap bg-teal-800 p-6">
        <div className="flex items-center text-white mr-6">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
            {/* <img src="img/logo_E_2.jpg" className="w-12"  alt="" /> */}
            <img src={logo} width='55' alt="logo" />
            <span className="font-dimibang text-3xl tracking-tight">
                <Link className="hover:text-green-500" to={'/'}>비단본가</Link>
            </span>
        </div>
        {/* 메뉴들 */}
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-lg lg:flex-grow">
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200 mr-4">
                    <NavLink to={'/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white")}>신부한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/parent'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>혼주한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/guest'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>하객한복</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/best'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>인기상품</NavLink>
                </p>
                <p className="p-1 block lg:inline-block lg:mt-0 text-teal-200  mr-4">
                    <NavLink to={'/fonts'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200 hover:text-white") }>폰트시트</NavLink>
                </p>
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