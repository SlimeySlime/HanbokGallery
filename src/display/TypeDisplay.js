import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useParams } from "react-router-dom"
import {IMAGE_PATH, SERVER_PATH, ERROR_HIDE, TYPE_TO_KOREAN} from '../general/General';
import { useSelector } from "react-redux";

// 타입별 파라미터에 따라 조회 
// useParams => type
const TypeDisplay = ({imageList}) => {
    const eventRental = useSelector(state => state.event.eventRental)
    const storeData = useSelector(state => state.event.store)
    const hanboks = useSelector(state => state.event.hanbok)

    const {type} = useParams();
    const typeString = TYPE_TO_KOREAN(type)

    // 행사일자에 대여나가는 한복리스트 
    const [blogData, setBlogData] = useState([]);
    const [filterdBlogData, setFilteredBlogData] = useState([]);
    // filter로 변경됨에 따라 blogData를 filteredList로 작명?

    // 1. unavailRentalMap   2. hanbokFilter  3. hanbokFiltered.unavail = ture / false 
    useEffect(() => {
        console.log('useEffected [type] ')
        eventRentalMap()
    }, [type])

    // 초기 불러오기 -> redux 이후에 불러오기
    // 가장 느린 eventRental redux 기준
    useEffect(() => {
        eventRentalMap()
        // console.log('useEffect [storedata, hanboks] ')
        // console.log('storeData', storeData)
        // console.log('hanboks', hanboks)
        // console.log('eventRental', eventRental)
    // }, [storeData, hanboks, eventRental])
    }, [eventRental])

    // ★★★
    // eventRental => unavailMap[gs_name] = item + count, stock
    const eventRentalMap = () => {
        // 검색에 용이하게 Map으로
        const hanbokMap = new Map()
        hanboks.map((item) => {
            hanbokMap[item.gs_name] = item
        })
        // eventRental Map
        let unavailMap = new Map()
        eventRental.map((item) => {
            if (item.gs_name in unavailMap) {
                unavailMap[item.gs_name].count += 1
            }else{
                unavailMap[item.gs_name] = {
                    ...item,
                    count : 1,
                    stock : hanbokMap[item.gs_name]?.gs_old_jgquant,  
                }
            }
        })
        // 3.
        setUnavailList(unavailMap)
        return unavailMap
    }
    // 기존 storeData(blogData)를 Map으로 만들고 unavailable을 추가 
    function setUnavailList(unavailMap){
        // const unavailList = new Map()
        const filteredHanbok = filterHanbok(type)   // 2.
        const newFilterd = filteredHanbok.map((item) => {
            if (item.bs_gsname1 in unavailMap){
                // 일단은 bs_gsname1 만
                const countStock = unavailMap[item.bs_gsname1].count / unavailMap[item.bs_gsname1].stock 
                const unavail = countStock >= 1 ? true : false
                return {
                    ...item,
                    unavailable : unavail
                }
            }else{
                return item 
            }
        })
        console.log(newFilterd)
        setBlogData(newFilterd)
        // console.log('inactive stores ', filtered)
    }
    // axios 대신 filtering
    function filterHanbok(keyword) {
        // storeData -> imageList 실험
        console.log('filter hanbok ', keyword)
        if (keyword === 'all') {
            // setBlogData(storeData)
            return imageList
        }else{
            let filtered = []
            imageList?.map((item) => {
                if (item.bs_part?.includes(typeString)) {
                    filtered.push(item)
                }
            })
            // setBlogData(filtered)
            return filtered
        }
    }
    // search by keyword
    function getHanbok() {
        console.log(SERVER_PATH)
        axios.get(SERVER_PATH, {
            params: {
                bs_part : typeString,
                bs_code : 'A',
            }
        })
        .then((result) => {
            console.log(result.data[0])
            setBlogData(result.data[0]);
        })
    }
    // All
    function getAllHanbok() {
        axios.get(SERVER_PATH)
        .then((result) => {
            console.log(result.data)
            setBlogData(result.data[0]);
            // setStoreData(result.data);
        })
    }
    function checkCurrent() {
        console.log('current blogData : ',  blogData)
    }

    const ImageDiv = (item) => {
        const unavailable = item.unavailable
        if (unavailable) {      // 대여불가능 상품 
            console.log(`${item.bs_gsname1} is unavail`)
            return(
            <div className="relative h-56 w-full mobile:h-32 overflow-hidden rounded justify-center items-center cursor-not-allowed">
                <img className="absolute object-cover blur-sm inset-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
                <div className="absolute w-full h-full flex bg-slate-400 bg-opacity-50 justify-center items-center">
                    <p className="text-white text-center text-md mobile:text-xs font-sans font-semibold">해당상품은 <br /> 대여불가능합니다.</p>    
                </div>
            </div>
            )
        }else {
            return(
            // <div className="relative w-500 h-52 mobile:h-32 bg-slate-50 overflow-hidden rounded justify-center items-center">
            <div className="relative h-56 w-full mobile:h-32 overflow-hidden rounded justify-center items-center bg-slate-50">
                <img className="absolute bottom-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
            </div>
            )
        }
    }

    const ImageDiv2 = (item) => {
        const unavailable = item.unavailable
        if (unavailable) {      // 대여불가능 상품 
            console.log(`${item.bs_gsname1} is unavail`)
            return(
            <div className="cursor-not-allowed">
                <img className="z-10" src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} alt={`[${item.bs_code}]`}  />
                <div className="w-full h-full flex bg-slate-700 bg-opacity-50 justify-center items-center">
                    <p className="text-white text-center text-md mobile:text-xs font-preten font-semibold">해당상품은 <br /> 대여불가능합니다.</p>    
                </div>
            </div>
            )
        }else {
            return(
            <div>
                <img className="z-10" src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} alt={`[${item.bs_code}]`}  />
            </div>
            )
        }
    }

    // 이미지경로 - IMAGE_PATH + Store/[A001]/1.jpg
    return(
        <div className="container mx-auto">
            <h3 className="text-2xl font-katuri m-4">{typeString} 한복</h3> 
            {/* <button className="hidden border border-slate-50 px-2 rounded bg-blue-300 hover:bg-blue-700"
                onClick={() => {checkCurrent()}}>현재 리스트 디버깅</button> */}

            {/* <div className='has-tooltip bg-blue-300'>
                <p className='tooltip2 bg-white border rounded p-1 mt-3 z-50 text-black'>tooltip testing</p>
                <p className='tooltip bg-white border rounded p-1 mt-3 z-50 text-black'>tooltip testing1.5</p>
                <p className='absolute mt-8 tooltip '>tooltip testing2</p>
                툴팁테스트
            </div> */}
            <div className="container grid mobile:grid-cols-3 grid-cols-6 mobile:gap-1 gap-6 ">
                {/* {filterdBlogData?.map((item) => */}
                {blogData?.map((item) =>
                <div className="cursor-pointer" id='image link container'>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.bs_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
                        {ImageDiv2(item)}
                        {/* <img src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} alt={`[${item.bs_code}]`}  /> */}
                        <p className="mt-1 text-xs tracking-tight">{typeString}한복</p>
                        <p className="font-sans mobile:text-sm ">[{item.bs_code}]{item.bs_gsname1?.split(' ')[0]}</p>
                        <p className="font-sans mobile:text-sm">{item.bs_gsname2?.split(' ')[0]} {item.bs_gsname3?.split(' ')[0]}</p>
                        <p className="inline-block mr-2 font-sans font-semibold mobile:text-sm">80,000원</p>
                        {/* <p className="inline font-sans font-thin text-slate-600 line-through mobile:text-sm">100,000원</p> */}
                    </div>
                </Link>  
                </div>
                )}
            </div>
        </div>
    )
}

export default TypeDisplay;