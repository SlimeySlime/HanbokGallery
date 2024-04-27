import axios from 'axios'
import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import { MdArrowForwardIos, MdArrowBackIosNew }  from "react-icons/md";
import { IMAGE_PATH, SERVER_PATH, ERROR_HIDE, GALLERY_PATH } from "../config/Config"
import RentalTemplate from '../general/RentalTemplate'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Gallery_Item } from 'domain/gallery_item';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

// const HanbokDisplay = ({itemInfo}) => {
const HanbokDisplayTS = () => {
    // /:id -> useParams()
    const {id} = useParams()
    // 약간 무식한 방법
    const [imageLength, setImageLength] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
    const [loadedList, setLoadedList] = useState<number[]>([])
    const [mobileSlideLength, setMobileSlideLength] = useState([1,2,3,4,5,6,7,8,9])

    const imageListRef = useRef<HTMLDivElement>(null)
    const [imageData, setImageData] = useState<Gallery_Item>(new Gallery_Item())
    const [previewIndex, setPreviewIndex] = useState(0)

    const prevNavigation = useRef(null)
    const nextNavigation = useRef(null)

    useEffect(() => {
        const server_gallery_item = `${SERVER_PATH}/gallery/${id}`
        axios.get(GALLERY_PATH + id)
        .then((result) => {
            setImageData(result.data)
        })
    }, [id])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    // const imageList = (css, onHover, onClick, w) => {
    const imageList = () => {
        // imageData.display_code -> [`{id}`]
        return(
            <div className='flex flex-col m-4 justify-center items-center'>
                {imageLength.map((num) => 
                <img src={IMAGE_PATH + `Store/[${id}]/${num}.jpg`} alt={imageData.hanbok_name1} 
                    className='p-2 mb-36 mobile:mb-12 mobile:p-0 border rounded-lg w-2/3 mobile:w-auto' 
                    onError={(e) => {ERROR_HIDE(e)}}  />
                )}
            </div>
        )
    }

    const sizes = (size: string) => {
        let sizes = size?.split(/[.,]+/)
        return sizes.join(', ')
    }
    

    const ImageSlide = () => {
        return(
        <Swiper
            pagination={true}
            navigation={{
                prevEl: prevNavigation.current,
                nextEl: nextNavigation.current,
            }}
            // onBeforeInit={{
            //     prevEl: prevNavigation.current,
            //     nextEl: nextNavigation.current,
            // }}
            modules={[Navigation, Pagination]}
            >
            {loadedList.map((num) => 
                <SwiperSlide>
                    <img src={IMAGE_PATH + `Store/[${id}]/${num}.jpg`} alt={imageData.display_code!} id={num.toString()}  />
                </SwiperSlide>
                
            )}
            <div className="absolute top-1/2 -translate-y-1/2 float-left z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200 
                mobile:p-1"
                ref={prevNavigation}><MdArrowBackIosNew /></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 float-right z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200
                mobile:p-1" 
                ref={nextNavigation}><MdArrowForwardIos /></div>
        </Swiper>
        )
    }

    function addLoadedImage(num: number) {
        let loaded = loadedList
        loaded.push(num)
        setLoadedList(loaded.sort((a, b) => a - b))
    }

    function hoverImageIndex(num: number) {
        if (loadedList.includes(num)) {
            const idx =  loadedList.indexOf(num)
            setPreviewIndex(idx)
        }
    }

    function increaseIndex() {
        if (previewIndex < loadedList.length - 1) {
            setPreviewIndex(previewIndex + 1)
        }
    }
    function decreaseIndex() {
        if (previewIndex > 0) {
            setPreviewIndex(previewIndex - 1)
        }
    }

    useEffect(() => {
        console.log(previewIndex)
        console.log(loadedList)
    }, [previewIndex])

    return(
        <div className='container mx-auto flex flex-1 mobile:flex-col '
        onMouseDown={() => {}}>
            <div className='flex flex-1 flex-col justify-center items-center' id='top'>
                {/* 상단 */}
                <div className='mt-12 p-4 flex flex-1 mobile:flex-col border'>
                    {/* 모바일 크게보기 슬라이드 */}
                    <div className='hidden mobile:flex w-screen justify-center items-center'>
                        {ImageSlide()}
                    </div>
                    {/* 데스크톱 크게보기 이미지 */}
                    <div className='mobile:hidden flex flex-col justify-center items-center'>
                        <div className='flex flex-1 items-center'>
                            <button className='p-1 rounded-full bg-blue-100'>
                                <GrFormPrevious size={32}
                                    onClick={() => {decreaseIndex()}}>
                                </GrFormPrevious>
                            </button>
                            <img className='p-2 pb-0 w-full max-w-lg'
                                src={IMAGE_PATH + `Store/[${id}]/${loadedList[previewIndex]}.jpg`} 
                                alt={imageData.display_code!} />
                            <button className='p-1 rounded-full bg-blue-100'>
                                <GrFormNext size={32}
                                    onClick={() => {increaseIndex()}}>
                                </GrFormNext>
                            </button>
                        </div>
                        <div className='mt-4 flex mobile:grid mobile:grid-cols-4 justify-center '>
                        {imageLength.map((num) => 
                            <img src={IMAGE_PATH + `Store/[${id}]/${num}.jpg`} 
                                alt={imageData.display_code!} id={num.toString()}
                                className='p-2 hover:bg-slate-200 rounded-lg w-20' 
                                // onMouseEnter={(e) => { setPreviewIndex(+e.currentTarget.id) }}     // parseInt by +
                                onMouseEnter={(e) => { hoverImageIndex(+e.currentTarget.id) }}     // parseInt by +
                                onLoad={(e) =>  { addLoadedImage(num) }}
                                onError={(e) => { ERROR_HIDE(e); }}
                                onClick={(e) => { setPreviewIndex(+e.currentTarget.id) }} />
                        )}
                        </div>
                    </div>
                    {/* 우측 상세설명 */}
                    <div className='m-4 mb-12 w-auto mobile:w-auto'>
                        {/* 타이틀 */}
                        {/* <h2 className='text-3xl ml-2 m-4 mb-8 font-samlip'>
                            [{imageData.display_code}] {imageData.hanbok_name1?.split(' ')[0]} {imageData.hanbok_name2?.split(' ')[0]} 
                        </h2> */}
                        <div className='mb-12 p-4 border-no'>
                            <p className='pt-4 text-2xl font-katuri border-b-2 pb-4'>[{imageData.display_code}] {imageData.hanbok_name1?.split(' ')[0]} {imageData.hanbok_name2?.split(' ')[0]}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.hanbok_type1} - {imageData.hanbok_name1?.split(' ')[0]}</p>
                            <p className='pt-4 text-2xl font-katuri'>size - {imageData.available_size && sizes(imageData.available_size)}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.hanbok_name2 && `${imageData.hanbok_type2} - ${imageData.hanbok_name2}`}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.hanbok_name3 && `${imageData.hanbok_type3} - ${imageData.hanbok_name3}`}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.hanbok_name4 && `${imageData.hanbok_type4} - ${imageData.hanbok_name4}`}</p>
                            {/* <p className='pt-4 text-2xl'>{imageData.available_size}</p> */}
                        </div>
                        <div>
                            <p className='flex mb-4 font-preten font-semibold text-lg'>
                                👩 저고리와 치마를 종류별로 다르게 선택해서 결정하실수도 있습니다. <br />
                                    예 ) A008 저고리, A029 치마
                            </p>
                            <p className='flex mb-4 font-preten font-semibold text-lg'>
                                🧵 정확하게 맞는 치수가 아니더라도 <br />
                                고객님의 키, 가슴둘레, 화장길이에 맞춰서 수선해드릴 수 있습니다.
                            </p>
                        </div>
                    </div>  
                </div>
               
                <RentalTemplate />

                <div className='mt-10 '>
                    {imageList()}

                </div>
            </div>
            
        </div>
    )
}

export default HanbokDisplayTS