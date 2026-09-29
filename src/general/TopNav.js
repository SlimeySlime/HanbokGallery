import logo from '../logo_1.svg';
// import axios from 'axios';
// import { DATE_ADD, DATE_TO_SQLSTRING, HANBOK_MAP, SERVER_PATH } from './Config';
import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import useScreenSize from 'util/useScreenSize';

const rentalControlClassName = 'rounded-md bg-white font-preten text-base py-1 ';

const SearchBox = ({ keyword, setKeyword, onSearch, className = '' }) => (
    <form className={`inline-flex border-blue-400 hover:shadow-md mobile:mt-4 ${className}`}
        role="search" onSubmit={(event) => { event.preventDefault(); onSearch(); }}>
        <button type="submit" aria-label="검색">
            <svg className="rounded-l-md w-8 h-8 bg-white text-gray-500 fill-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </button>
        <input className="rounded-r-md focus:outline-none" type="text" aria-label="검색어" placeholder="검색"
            value={keyword} onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) {
                    event.preventDefault();
                }
            }} />
    </form>
);

const TopNav = ({eventDate, setEventDate, rentalMode, setRentalMode}) => {
    
    const [navVisible, setNavVisible] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('')

    const [categoryIndex, setCategoryIndex] = useState(0)
    const categoryContainerRef = useRef(null)
    const categoryItemRef = useRef([])

    const screenSize = useScreenSize()
    const [isMobile, setIsMobile] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        console.log('top nav rendered')
    }, [])
    useEffect(() => {
        console.log('top nav rendered')
        scrollToCategory(categoryIndex)
    }, [categoryIndex])

    useEffect(() => {
        if (screenSize.hegiht > screenSize.width) {
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
        console.log('screensize useEffect')
    }, [screenSize])

    function onOffNav(){
        setNavVisible(!navVisible)
    }

    const submitSearch = () => {
        const keyword = searchKeyword.trim();
        if (!keyword) return;
        navigate(`/searchResult/${encodeURIComponent(keyword)}`);
        setNavVisible(false);
    }

    const scrollToCategory = (index) => {
        categoryItemRef.current[index]?.scrollIntoView({
            behavior: 'smooth', block: 'nearest', inline: 'center'
        })
    }


    const Category_Tab = ({index, text, navlink}) => {
        return(
        <button className='p-2 inline-block grow-0 shrink-0 basis-auto text-lg font-preten'
            // onClick={() => scrollToCategory(index)}
            onClick={() => setCategoryIndex(index)}
            ref={ el => categoryItemRef.current[index] = el}
            key={index}>
            <NavLink to={navlink}
                className={(state) => (state.isActive ? "text-white" : "text-teal-200") } 
                onClick={()=>{setNavVisible(false)}}>
                    {text}
            </NavLink>
        </button>
        )
    }

    const renderMobileNav = () => {
        return(
        <nav className="w-full sticky p-2 flex-wrap flex-col items-center justify-between 
            bg-teal-800 top-0 z-50">
        <div className='flex flex-col'>
            <div className='flex-1'>
                <div className="inline-block items-center justify-center text-white p-1 mr-6">
                    <Link className="hover:text-green-500" to={'/'}>
                        <img className='fill-white w-8 mr-2 inline-block' src={logo} fill='#f4f4f4' alt=""/>
                    </Link>
                    <Link className="hover:text-green-500" to={'/'}>
                        <span className="mobile:hidden inline-block leading-2 font-dimibang text-3xl tracking-tight">비단본가</span>
                    </Link>
                </div>
                <div className='flex float-right'>
                    <div className='flex items-center mr-1 text-preten text-xs text-white font-sans font-semibold'>
                        행사날짜
                    </div>
                    <input className={`${rentalControlClassName} pl-2 my-1 mr-2 w-36 inline-block`}
                        type="date" title='행사날짜를 지정해주세요' id='eventDate' name="eventDate" 
                        onChange={(e) => {setEventDate(e)}} 
                        value={eventDate}/>
                    <select aria-label="수령 방식" title="수령 방식을 선택해주세요"
                        className={`${rentalControlClassName} my-1 mr-1 px-1`}
                        value={rentalMode} onChange={setRentalMode}>
                        <option value="delivery">택배</option>
                        <option value="store">매장</option>
                    </select>
                    <HiMenuAlt2 className='w-10 h-10 p-1' color='white' onClick={() => {onOffNav()}}/>
                    {/* <p className='inline text-white py-2 font-preten font-semibold' onClick={() => {onOffNav()}}>메뉴</p> */}
                </div>
            </div>
            {/* 사이드 스크롤링 메뉴 */}
            <div className='flex overflow-x-auto overflow-y-hidden' ref={categoryContainerRef}>
                <Category_Tab index={0} text='전체 보기' navlink='/main/all'></Category_Tab>
                <Category_Tab index={1} text='신부 한복' navlink='/main/bride'></Category_Tab>
                <Category_Tab index={2} text='신랑 한복' navlink='/main/groom'></Category_Tab>
                <Category_Tab index={3} text='혼주 한복' navlink='/main/parent'></Category_Tab>
                <Category_Tab index={4} text='하객 한복' navlink='/main/guest'></Category_Tab>
                <div className='my-2 border-l-2 border-teal-500'></div>
                <Category_Tab index={5} text='플러스 사이즈' navlink='/main/plus'></Category_Tab>
            </div>
            {/* 사이드 카테고리 */}
            <div className={(navVisible ? 'left-0 ' : '-left-full' ) + ` fixed bottom-0 top-24 w-3/5 bg-teal-700 opacity-90 transition-left duration-500 sm:hidden`}>
            <ul className='p-2'>
                <p className="p-2 block text-teal-200 text-lg  border-b">
                    <NavLink to={'/main/all'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>전체보기</NavLink>
                </p>
                <p className="p-2 flex flex-1 text-teal-200 text-lg border-b">
                    <NavLink to={'/main/bride'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>
                            신부한복
                    </NavLink>
                </p>
                <p className="p-2 flex flex-1 text-teal-200 text-lg border-b">
                    <NavLink to={'/main/groom'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>
                            신랑한복
                    </NavLink>
                </p>
                <p className="p-2 block text-teal-200 text-lg border-b">
                    <NavLink to={'/main/parent'}
                        className={(state) => (state.isActive ? "text-white " : "text-teal-200" )} onClick={()=>{setNavVisible(false)}}>
                            혼주한복
                    </NavLink>
                </p>
                <p className="p-2 block text-teal-200 text-lg border-b">
                    <NavLink to={'/main/guest'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") } onClick={()=>{setNavVisible(false)}}>
                            하객한복
                    </NavLink>
                </p>
                <div className='border-b-2'></div>
                <p className="p-2 block text-teal-200 text-lg border-b">
                    <NavLink to={'/main/plus'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") } onClick={()=>{setNavVisible(false)}}>
                            플러스 사이즈
                    </NavLink>
                </p>
                <p className="hidden p-2 block2 text-teal-200 text-lg border-b">
                    <NavLink to={'/main/best'}
                        className={(state) => (state.isActive ? "text-white" : "text-teal-200") } onClick={()=>{setNavVisible(false)}}>
                            인기상품
                        </NavLink>
                </p>
                <div className='mt-4 text-base text-white font-sans font-semibold'>
                    행사날짜
                </div>
                <div className='inline-flex'>
                    <input className={`${rentalControlClassName} pl-2 mr-2 mobile:inline-block`} type="date" title='행사날짜를 지정해주세요' id='eventDate' name=""
                        onChange={(e) => {setEventDate(e)}} 
                        // value={cookie.eventdate}/>
                        value={eventDate}/>
                    <label className="mr-1 text-base text-white font-sans font-semibold" htmlFor="rentalModeMobileMenu">수령</label>
                    <select id="rentalModeMobileMenu" className={`${rentalControlClassName} px-2`}
                        value={rentalMode} onChange={setRentalMode}>
                        <option value="delivery">택배</option>
                        <option value="store">매장</option>
                    </select>
                </div>
                {/* 검색 -> 모바일에선 x */}
                <SearchBox className="mobile:hidden" keyword={searchKeyword} setKeyword={setSearchKeyword} onSearch={submitSearch} />
            </ul>
            </div>
        </div>
        </nav>
        )
    }

    const renderWideNav = () => {
        return(
            
        <nav className="flex flex-col sticky p-2 bg-teal-800 top-0 z-50">
            {/* 데스크톱 와이드 메뉴 */}
            <div className="w-auto flex-1">
                <div className="inline-flex h-full text-lg lg:flex-grow float-left">
                    <div className="flex items-center justify-center text-white mr-6">
                        <Link className="hover:text-green-500" to={'/'}>
                            <img className='fill-white w-8 mr-2 inline-block' src={logo} fill='#f4f4f4' alt=""/>
                        </Link>
                        <Link className="hover:text-green-500" to={'/'}>
                            <span className="mobile:hidden inline-block leading-2 font-dimibang text-3xl tracking-tight">비단본가</span>
                        </Link>
                    </div>
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
                    <div className='h-8 border-l-2 mr-2 m-auto'>
                        
                    </div>
                    <p className="p-2 block sm:inline-block text-teal-200 mr-4">
                        <NavLink to={'/main/plus'}
                            className={(state) => (state.isActive ? "text-white" : "text-teal-200") }>플러스 사이즈+</NavLink>
                    </p>
                    <p className="p-2 hidden text-teal-200 mr-4">
                        <NavLink to={'/main/best'}
                            className={(state) => (state.isActive ? "text-white" : "text-teal-200") + ' text-lg font-preten'}>인기상품</NavLink>
                    </p>
                </div>
                {/* 행사날짜 및 검색 */}
                <div className='inline-flex h-full p-2 float-right items-center mobile:block'> 
                    <label className='mr-4 text-xl text-slate-100 font-preten font-bold has-tooltip'>행사날짜</label>
                    <input className={`${rentalControlClassName} pl-4 mr-2 mobile:inline-block`} type="date" title='행사날짜를 지정해주세요' id='eventDate' name=""
                        onChange={(e) => {setEventDate(e)}} 
                        // value={cookie.eventdate}/>
                        value={eventDate}/>

                    <label className="mx-2 text-xl text-slate-100 font-preten font-bold" htmlFor="rentalModeDesktop">수령</label>
                    <select id="rentalModeDesktop" className={`${rentalControlClassName} mr-2 px-2`}
                        value={rentalMode} onChange={setRentalMode}>
                        <option value="delivery">택배</option>
                        <option value="store">매장</option>
                    </select>
                    {/* 검색 */}
                    <SearchBox keyword={searchKeyword} setKeyword={setSearchKeyword} onSearch={submitSearch} />
                </div>
            </div>
        </nav>
        )
    }
    // Render JSX helpers directly so typing does not create a new component type.
    return isMobile ? renderMobileNav() : renderWideNav();

}

export default TopNav
