import { Gallery_Item } from "domain/gallery_item";
import { IMAGE_PATH } from "general/Config";
import React from "react";


type Gallery_Item_Prop = {
    item : Gallery_Item
}
// const ImageBox = ({display_code:String, available_size, unavailable}: {String, String, boolean}) => {
const ImageBox = ({item}: Gallery_Item_Prop) => {

    // 하위 사이즈 추가해서 리턴 
    const itemSizes = (size: string) => {
        let sizes = size?.split(/[.,]+/)
        // sizes.unshift(sizes[0] - 11) // 이미 -11 사이즈가 db에 들어가있음
        return sizes?.join(', ')
    }

    if (item.unavailable) {      // 대여불가능 상품 
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

export default ImageBox