import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useParams } from "react-router-dom"
import {IMAGE_PATH, SERVER_PATH, ERROR_HIDE, TYPE_TO_KOREAN} from '../general/General';
import { useSelector } from "react-redux";

// 타입별 파라미터에 따라 조회 
// useParams => type
const TypeDisplay = ({props}) => {
    const {type} = useParams();
    const typeString = TYPE_TO_KOREAN(type)
    // 행사일자에 대여나가는 한복리스트 
    const [hanbokList, setHanbokList] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [filterdBlogData, setFilteredBlogData] = useState([]);
    // 대신에
    const [unavailList, setUnavailList] = useState({});
    const eventRental = useSelector(state => state.event.eventRental)
    const storeData = useSelector(state => state.event.store)
    const hanboks = useSelector(state => state.event.hanbok)

    // 초기 불러오기
    // 
    useEffect(() => {
        filterHanbok(type) 
    }, [type, eventRental])
    
    useEffect(() => {
        console.log('current blog data length : ', blogData?.length)
        // 2 
        // unavaileList()
        // 3
        // setInactiveStore()
    }, [blogData])
    
    // debug
    useEffect(() => {
        console.log(typeString)
    }, [typeString])

    // axios 대신 filtering해서 state에 저장 
    function filterHanbok(keyword) {
        if (keyword === 'all') {
            setBlogData(storeData)
        }else{
            let filtered = []
            storeData?.map((item) => {
                if (item.bs_part?.includes(typeString)) {
                    filtered.push(item)
                }
            })
            setBlogData(filtered)
        }
        
    }
    // hanbok과 eventRental map으로 작성
    // event[gs_name] = 1/2 -> store.map(gs_name in event)
    const getUnavaileList = () => {
        const hanbokMap = new Map()
        // 검색에 용이하게 Map으로
        hanboks.map((item) => {
            hanbokMap[item.gs_name] = item
        })
        // 대여불가 Map
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
        
        console.log('unavailMap', unavailMap)
        setInactiveStore(unavailMap)
    }

    function setInactiveStore(unavail){
        const unavailList = new Map()
        const filtered = blogData
        filtered.map((item) => {
            if (item.bs_gsname1 in unavail){
                // 일단은 bs_gsname1 만
                const countStock = unavail[item.bs_gsname1].count / unavail[item.bs_gsname1].stock 
                const unavail = countStock >= 1 ? true : false
                item = {
                    ...item,
                    unavailable : unavail
                }
                if (countStock >= 1) {
                    unavailList[item.bs_gsname1] = unavail
                }
                console.log(`${item.bs_code} ${item.bs_gsname1} is set to ${item.unavailable}`)
            }
        })
        console.log(filtered)
        setFilteredBlogData(filtered)
        // console.log('inactive stores ', filtered)
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

    const ImageDiv = (item) => {
        const unavailable = item.unavailable
        // console.log('imageDiv item ', item)
        let imgdiv = ''
        if (unavailable) {
            console.log(`${item.bs_gsname1} is unavail`)
            imgdiv =   
            <div className="relative w-full h-52 mobile:h-24 overflow-hidden rounded justify-center items-center">
                <img className="absolute object-cover blur-sm inset-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
                <div className="absolute w-full h-full flex bg-slate-400 bg-opacity-50 justify-center items-center">
                    <p className="text-white text-center text-md mobile:text-xs font-sans font-semibold">해당상품은 <br /> 대여불가능합니다.</p>    
                </div>
            </div>
        }else {
            imgdiv =   
            <div className="relative w-full h-52 mobile:h-24 bg-slate-200 overflow-hidden rounded justify-center items-center">
                <img className="absolute object-cover inset-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
            </div>
        }

        return imgdiv
    }

    // 이미지경로 - IMAGE_PATH + Store/[A001]/1.jpg
    return(
        <div className="container mx-auto">
            <h3 className="text-2xl font-katuri m-4">{typeString} 한복</h3> 
            {/* <div className='has-tooltip bg-blue-300'>
                <p className='tooltip2 bg-white border rounded p-1 mt-3 z-50 text-black'>tooltip testing</p>
                <p className='tooltip bg-white border rounded p-1 mt-3 z-50 text-black'>tooltip testing1.5</p>
                <p className='absolute mt-8 tooltip '>tooltip testing2</p>
                툴팁테스트
            </div> */}
            {/* <div className='has-tooltip bg-blue-300'>
                <p className='tooltip border rounded p-1 mt-3 z-50 text-black'>tooltip testing1.5</p>
                툴팁테스트
            </div> */}
            <div className="container grid mobile:grid-cols-3 grid-cols-6 mobile:gap-1 gap-6 ">
                {filterdBlogData?.map((item) =>
                <div className="cursor-pointer" id='image link container'>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.bs_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
                        <div className="relative w-full h-52 mobile:h-24 overflow-hidden rounded justify-center items-center">
                            {ImageDiv(item)}
                            {/* <img className="absolute object-cover blur-sm inset-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
                            <div className="absolute w-full h-full flex bg-slate-400 bg-opacity-50 justify-center items-center">
                                <p className="text-white text-center text-md mobile:text-xs font-sans font-semibold">해당상품은 <br /> 대여불가능합니다.</p>    
                            </div> */}
                        </div>
                        {/* <img className="w-full rounded" src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" /> */}
                        <p className="mt-1 text-xs tracking-tight">{typeString}한복</p>
                        <p className="font-sans">[{item.bs_code}]{item.bs_gsname1?.split(' ')[0]}</p>
                        <p className="font-sans">{item.bs_gsname2?.split(' ')[0]} {item.bs_gsname3?.split(' ')[0]}</p>
                        <p className="inline-block font-sans font-semibold">80,000 원</p>
                        <p className="ml-1 inline font-sans font-thin text-slate-600 line-through">100,000 원</p>
                    </div>
                </Link>  
                </div>
                )}
            </div>
        </div>
    )
}

export default TypeDisplay;