import React, { useEffect, useState } from "react"
// import axios from 'axios'
import { Link, useParams } from "react-router-dom"
import {IMAGE_PATH, SERVER_PATH, ERROR_HIDE, TYPE_TO_KOREAN} from '../general/Config';
import { useSelector } from "react-redux";
import { Gallery_Item } from '../domain/gallery_item';
import { Hanbok_Item } from "domain/hanbok_item";
import { RootState } from "reducing/store";

// 타입별 파라미터에 따라 조회 
// useParams => type
const TypeDisplay = ({}) => {
    const eventRental = useSelector( (state:RootState) => state.gallery.eventRental)
    const storeData = useSelector( (state:RootState) => state.gallery.galleryInfos)
    const hanboks = useSelector( (state:RootState) => state.gallery.hanboks)

    const { type } = useParams();
    const typeString = TYPE_TO_KOREAN(type)

    // 행사일자에 대여나가는 한복리스트 
    const [blogData, setBlogData] = useState<Gallery_Item[]>([]);
    const [filterdBlogData, setFilteredBlogData] = useState([]);
    // filter로 변경됨에 따라 blogData를 filteredList로 작명?

    // 1. unavailRentalMap  대여중인 한복을 검색해 재고현황 추가
    // 2. hanbokFilter      
    // 3. hanbokFiltered.unavail = true / false 

    useEffect(() => {
        eventRentalMap()
    }, [type, eventRental])

    useEffect(() => {
        console.log('blog data filtered to ', blogData)
    }, [blogData])

    // eventRental => unavailMap[name] = item + count, stock
    const eventRentalMap = () => {
        // 검색에 용이하게 Map으로
        const hanbokMap = new Map<string, string>()
        hanboks?.map((item) => {
            hanbokMap[item.barcode] = item
        })
        console.log(hanbokMap)
        // eventRental Map
        let unavailMap = new Map()
        eventRental.map((item) => {
            if (hanbokMap.has(item.hanbok_barcode1)) {
                unavailMap[item.hanbok_barcode1].count += 1
            }else{
                unavailMap[item.hanbok_barcode1] = {
                    ...item,
                    count : 1,
                    stock : hanbokMap[item.hanbok_barcode1]?.stock,  
                }
            }
        })
        console.log('eventRental', eventRental)
        console.log('unavailMap', unavailMap)
        for (const item of unavailMap.keys()){ 
            console.log('unavail keys', item)
        }
        // 3.
        // setUnavailList(unavailMap)
        return unavailMap
    }
    // 기존 storeData(blogData)를 Map으로 만들고 unavailable을 추가 
    function setUnavailList(unavailMap){
        // const unavailList = new Map()
        const filteredHanbok = filterHanbok(type)   // type으로 필터링된 갤러리 아이템 
        const newFilterd = filteredHanbok.map((item) => {
            console.log(`check unavailMap.has ${item.hanbok_barcode1} `)
            // if (item.hanbok_name1 in unavailMap){
            if (unavailMap.contains(item.hanbok_barcode1)){
                // 일단은 hanbok_name1 만
                const countStock = unavailMap[item.hanbok_name1].count / unavailMap[item.hanbok_name1].stock 
                const unavail = countStock >= 1 ? true : false
                console.log(`item.${item.hanbok_name1} is ${unavailMap[item.hanbok_name1].count} / ${unavailMap[item.hanbok_name1].stock }`)
                return {
                    ...item,
                    unavailable : unavail
                }
            }else{
                console.log('not in unavailmap')
                return {
                    ...item,
                    unavailable : false
                } 
            }
        })
        console.log('new filtered', newFilterd)
        setBlogData(newFilterd)
    }
    
    function filterHanbok(keyword: string) {
        if (keyword === 'all') {
            // setBlogData(storeData)
            return storeData
        }else{
            let filtered:Gallery_Item[] = []
            storeData?.map((item: Gallery_Item) => {
                if (item.customer_type?.includes(typeString)) {
                    filtered.push(item)
                }
            })
            // setBlogData(filtered)
            return filtered
        }
    }
    // search by keyword
    
    const ImageDiv = (item: Gallery_Item) => {
        const unavailable = item.unavailable
        if (unavailable) {      // 대여불가능 상품 
            console.log(`${item.hanbok_name1} is unavail`)
            return(
            <div className="relative h-56 w-full mobile:h-32 overflow-hidden rounded justify-center items-center cursor-not-allowed">
                <img className="absolute object-cover blur-sm inset-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} width={500} alt="" />
                <div className="absolute w-full h-full flex bg-slate-400 bg-opacity-50 justify-center items-center">
                    <p className="text-white text-center text-md mobile:text-xs font-sans font-semibold">해당상품은 <br /> 대여불가능합니다.</p>    
                </div>
            </div>
            )
        }else {
            return(
            // <div className="relative w-500 h-52 mobile:h-32 bg-slate-50 overflow-hidden rounded justify-center items-center">
            <div className="relative h-56 w-full mobile:h-32 overflow-hidden rounded justify-center items-center bg-slate-50">
                <img className="absolute bottom-0 w-full rounded " src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} width={500} alt="" />
            </div>
            )
        }
    }

    // 하위 사이즈 추가해서 리턴 
    const itemSizes = (size: string) => {
        let sizes = size?.split(/[.,]+/)
        // sizes.unshift(sizes[0] - 11) // 이미 -11 사이즈가 db에 들어가있음
        return sizes?.join(', ')
    }

    const ImageDiv2 = (item: Gallery_Item ) => {
        const unavailable = item.unavailable
        if (unavailable) {      // 대여불가능 상품 
            console.log(`${item.hanbok_name1} is unavail`)
            return(
            <div className="relative cursor-not-allowed">
                <img className="object-cover w-full" src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`} loading='lazy' />
                <div className="absolute bottom-0 left-0 flex flex-1 z-10 w-full items-center justify-center bg-teal-600 bg-opacity-50">
                    <p className="m-2 text-white text-center text-md mobile:text-xs font-preten font-semibold">이 상품은 해당날짜에 <br /> 대여불가능합니다.</p>    
                </div>
            </div>
            )
        }else{
            return(
            <div className="relative">
                <img className="object-cover w-full" src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`} loading='lazy'  />
                <div className="absolute bottom-0 right-0 translate-y-6no flex z-10 items-center justify-center bg-slate-200 bg-opacity-70">
                    <p className="p-1 font-preten font-semibold text-sm mobile:text-xs mobile:p-220">{itemSizes(item.available_size)} size</p>
                </div>
            </div>
            )
        }
    }

    // 이미지경로 - IMAGE_PATH + Store/[A001]/1.jpg
    return(
        <div className="container mx-auto px-8 mobile:p-0">
            <h3 className="text-2xl font-katuri m-8">{typeString} 한복</h3> 
            <div className="container grid mobile:grid-cols-2 grid-cols-6 mobile:gap-1 gap-6 ">
                {/* {filterdBlogData?.map((item) => */}
                {blogData?.map((item) =>
                <div className="cursor-pointer" id='image link container'>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.display_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
                        {ImageDiv2(item)}
                        {/* <img src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`}  /> */}
                        <p className="mt-1 text-xs font-sans tracking-tight">{typeString}한복</p>
                        <p className="font-sans mobile:text-sm ">[{item.display_code}]{item.hanbok_name1?.split(' ')[0]}</p>
                        <p className="font-sans mobile:text-sm">{item.hanbok_name2?.split(' ')[0]} {item.hanbok_name3?.split(' ')[0]}</p>
                        <p className="inline-blockno hidden mr-2 font-sans font-semibold mobile:text-sm">70,000원</p>
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