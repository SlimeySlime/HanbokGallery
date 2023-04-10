import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IMAGE_PATH, TYPE_TO_KOREAN } from '../general/Config';
import { useSelector } from "react-redux";
import { Gallery_Item } from '../domain/gallery_item';
import { RootState } from "reducing/store";
import { Rental_Item } from "domain/rental_item";
import { AVAILABLE_GALLERY_ITEM, AVAILABLE_ITEM, CustomerFilteredHanbok } from "util/display_filter";
import ImageBox from "./ImageBox";

// 타입별 파라미터에 따라 조회 
// useParams => type
const TypeDisplay = () => {
    const rentalItems:Rental_Item[] = useSelector( (state:RootState) => state.gallery.rentalItems)
    const galleryData = useSelector( (state:RootState) => state.gallery.galleryInfos)
    const { type } = useParams();
    const typeString = TYPE_TO_KOREAN(type)

    const [galleryItem, setGalleryItem] = useState<Gallery_Item[]>([]);

    useEffect(() => {
        // eventRentalMap()
        setAvailableList()
    }, [type, rentalItems]) 

    useEffect(() => {
        // console.log('blog data filtered to ', galleryItem)
    }, [galleryItem])

    const setAvailableList = () => {
        const CustomerfilteredHanbok: Gallery_Item[] = CustomerFilteredHanbok(galleryData, type!)
        const unavailable_map: Map<string, Rental_Item> = AVAILABLE_ITEM(rentalItems)
        const available_gallery_items = AVAILABLE_GALLERY_ITEM(unavailable_map, CustomerfilteredHanbok)
        setGalleryItem(available_gallery_items)
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
                <img className="object-cover h-60 w-full" src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`} loading='lazy' />
                <div className="absolute bottom-0 left-0 flex flex-1 z-10 w-full items-center justify-center bg-teal-600 bg-opacity-50">
                    <p className="m-2 text-white text-center text-md mobile:text-xs font-preten font-semibold">이 상품은 해당날짜에 <br /> 대여가 어렵습니다.</p>    
                </div>
            </div>
            )
        }else{
            return(
            <div className="relative">
                <img className="object-cover h-60 w-full" src={IMAGE_PATH + `Store/[${item.display_code}]/1.jpg`} alt={`[${item.display_code}]`} loading='lazy'  />
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
                {/* {filterdgalleryItem?.map((item) => */}
                {galleryItem?.map((item) =>
                <div className="cursor-pointer" id='image link container'>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.display_code}`}>
                    <div className="mb-4 p-2 shadow-md hover:shadow-lg"> 
                        {/* {ImageDiv2(item)} */}
                        {<ImageBox item={item}></ImageBox>}
                        <p className="mt-1 text-xs font-sans tracking-tight">{typeString}한복</p>
                        <p className="font-sans mobile:text-sm ">[{item.display_code}] {item.hanbok_name1?.split(' ')[0]}</p>
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