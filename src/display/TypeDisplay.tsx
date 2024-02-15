import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { IMAGE_PATH, TYPE_TO_KOREAN } from '../config/Config';
import { useSelector } from "react-redux";
import { Gallery_Item } from '../domain/gallery_item';
import { RootState } from "reducing/store";
import { Rental_Item } from "domain/rental_item";
import { CHECK_ITEM_AVAILABILITY, SET_ITEM_AVAILABLE, CustomerFilteredHanbok } from "util/display_filter";
import ImageBox from "./ImageBox";

// 타입별 파라미터에 따라 조회 
// useParams => type
const TypeDisplay = () => {
    const { type } = useParams();
    const typeString = TYPE_TO_KOREAN(type)
    const rentalItems:Rental_Item[] = useSelector( (state:RootState) => state.gallery.rentalItems)
    // const galleryData = useSelector( (state:RootState) => state.gallery.galleryInfos)
    const galleryFiltered = useSelector( (state:RootState) => state.gallery.galleryFiltered)

    const [galleryItem, setGalleryItem] = useState<Gallery_Item[]>([]);

    useEffect(() => {
        // eventRentalMap()
        // setAvailableList()
        setTypeFilter()
    }, [type, galleryFiltered]) 

    function setTypeFilter() {
        console.log('set type filter to ', type)
        const typeFiltered: Gallery_Item[] = CustomerFilteredHanbok(galleryFiltered, type!)
        setGalleryItem(typeFiltered)
    }

    // 이미지경로 - IMAGE_PATH + Store/[A001]/1.jpg
    return(
        <div className="container mx-auto px-8 mobile:p-0">
            <h3 className="text-2xl font-katuri m-8">{typeString} 한복</h3> 
            <div className="container grid mobile:grid-cols-2 grid-cols-6 mobile:gap-1 gap-6 ">
                {/* {filterdgalleryItem?.map((item) => */}
                {galleryItem?.map((item) =>
                <div className="cursor-pointer" id='image link container' key={item.display_code}>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.display_code}`}>
                    <div className="mb-4 p-2 shadow-md hover:shadow-lg"> 
                        {/* {ImageDiv2(item)} */}
                        {<ImageBox item={item}></ImageBox>}
                        <p className="mt-1 text-xs font-sans tracking-tight">{typeString}한복</p>
                        <p className="font-sans mobile:text-sm ">[{item.display_code}] {item.hanbok_name1?.split(' ')[0]}</p>
                        <p className="font-sans mobile:text-sm">{item.hanbok_name2?.split(' ')[0]} {item.hanbok_name3?.split(' ')[0]}</p>
                        {/* <p className="inline-blockno hidden mr-2 font-sans font-semibold mobile:text-sm">70,000원</p> */}
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