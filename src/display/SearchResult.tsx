import { Gallery_Item } from "domain/gallery_item";
import { Rental_Item } from "domain/rental_item";
import React, { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "reducing/store";
import { CHECK_ITEM_AVAILABILITY, SET_ITEM_AVAILABLE, HanboknameFilteredHanbok } from "util/display_filter";
import { IMAGE_PATH } from "../config/Config";
import ImageBox from "./ImageBox";

const SearchResult = () => {
    const routeName = 'searchResult'
    // const rentalItem: Rental_Item[] = useSelector( (state:RootState) => state.gallery.rentalItems)
    const rentalItems:Rental_Item[] = useSelector( (state:RootState) => state.gallery.rentalItems)
    const galleryData:Gallery_Item[] = useSelector( (state:RootState) => state.gallery.galleryInfos)

    const [galleryItems, setGalleryItems] = useState<Gallery_Item[]>([]);
    const [filterdBlogData, setFilteredBlogData] = useState([]);
    
    const {keywords} = useParams()

    useEffect(() => {
        console.log('current param(keyword) ', keywords)
    }, [])
    // ★★ 1. unavailRentalMap -> 2. hanbokFilter -> 3. hanbokFiltered.unavail = ture / false 
    // 초기 불러오기
    useEffect(() => {
        setAvailableList()
        // console.log('search keyword ', keywords.split(' '))
    }, [rentalItems, keywords])

    const setAvailableList = () => {
        const filteredHanbok: Gallery_Item[] = HanboknameFilteredHanbok(galleryData, keywords!)
        const unavailable_map: Map<string, Rental_Item> = SET_ITEM_AVAILABLE(rentalItems)
        const available_gallery_items = CHECK_ITEM_AVAILABILITY(unavailable_map, filteredHanbok)
        setGalleryItems(available_gallery_items)
    }
    
    const itemSizes = (size: string) => {
        let sizes = size?.split(/[.,]+/)
        // sizes.unshift(sizes[0] - 11) // 이미 -11 사이즈가 db에 들어가있음
        return sizes?.join(', ')
    }
    const ImageDiv = (item: Gallery_Item ) => {
        const unavailable = item.unavailable
        if (unavailable) {      // 대여불가능 상품 
            console.log(`${item.hanbok_name1} is unavail`)
            return(
            <div className="relative cursor-not-allowed">
                <img className="object-cover w-full" src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`} loading='lazy' />
                <div className="absolute bottom-0 left-0 flex flex-1 z-10 w-full items-center justify-center bg-teal-600 bg-opacity-50">
                    <p className="m-2 text-white text-center text-md mobile:text-xs font-preten font-semibold">이 상품은 해당날짜에 <br /> 대여가 어렵습니다.</p>    
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
        <div className="container flex-1 mx-auto">
            <h3 className="text-2xl font-katuri m-4">검색 결과 : { keywords } </h3> 
            <div className="container grid mobile:grid-cols-3 grid-cols-6 mobile:gap-1 gap-6 ">
                {/* {filterdBlogData?.map((item) => */}
                {galleryItems?.map((item) =>
                <div className="cursor-pointer" id='image link container'>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.display_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
                        {/* {ImageDiv(item)} */}
                        {<ImageBox item={item}></ImageBox>}
                        <p className="font-sans mobile:text-sm ">[{item.display_code}] {item.hanbok_name1?.split(' ')[0]}</p>
                        <p className="font-sans mobile:text-sm">{item.hanbok_name2?.split(' ')[0]} {item.hanbok_name3?.split(' ')[0]}</p>
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


export default SearchResult