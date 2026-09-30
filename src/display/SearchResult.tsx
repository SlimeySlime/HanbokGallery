import { Gallery_Item } from "domain/gallery_item";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "reducing/store";
import { HanboknameFilteredHanbok } from "util/display_filter";
import ImageBox from "./ImageBox";

const SearchResult = () => {
    const galleryData:Gallery_Item[] = useSelector( (state:RootState) => state.gallery.galleryFiltered)

    
    const {keywords} = useParams()

    const galleryItems = useMemo(
        () => HanboknameFilteredHanbok(galleryData, keywords!), [galleryData, keywords]
    );
    
    return(
        <div className="container flex-1 mx-auto">
            <h3 className="text-2xl font-katuri m-4">검색 결과 : { keywords } </h3> 
            <div className="container grid mobile:grid-cols-3 grid-cols-6 mobile:gap-1 gap-6 ">
                {/* {filterdBlogData?.map((item) => */}
                {galleryItems?.map((item) =>
                <div className="cursor-pointer" id='image link container' key={item.display_code}>
                {/* blur여부 + div hidden 여부 */}
                <Link to={`/display/${item.display_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
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
