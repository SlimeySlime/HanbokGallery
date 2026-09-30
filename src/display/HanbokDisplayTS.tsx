import axios from 'axios'
import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MdArrowForwardIos, MdArrowBackIosNew }  from "react-icons/md";
import { IMAGE_PATH, ERROR_HIDE, GALLERY_PATH } from "../config/Config"
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
    const {id} = useParams()
    // 상품이 바뀌면 이미지 목록과 진행 중인 조회 상태도 새로 시작한다.
    return <HanbokDetail key={id} id={id!} />
}

const HanbokDetail = ({id}: {id: string}) => {
    const navigate = useNavigate()
    // 약간 무식한 방법
    const imageLength = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
    const [loadedList, setLoadedList] = useState<number[]>([])
    const [imageData, setImageData] = useState<Gallery_Item>(new Gallery_Item())
    const [selectedImageNumber, setSelectedImageNumber] = useState<number | null>(null)
    const [failedImages, setFailedImages] = useState<number[]>([])
    const [status, setStatus] = useState<'loading' | 'ready' | 'notFound' | 'error'>('loading')
    const [retry, setRetry] = useState(0)
    const previewIndex = selectedImageNumber === null ? -1 : loadedList.indexOf(selectedImageNumber)
    const imageMessage = failedImages.length === imageLength.length
        ? '등록된 이미지가 없습니다.' : '이미지를 불러오는 중입니다.'

    const prevNavigation = useRef(null)
    const nextNavigation = useRef(null)

    useEffect(() => {
        let active = true
        setStatus('loading')
        axios.get(GALLERY_PATH + id, { timeout: 15000 })
        .then((result) => {
            if (!active) return
            setImageData(result.data)
            setStatus('ready')
        })
        .catch((error) => {
            if (active) setStatus(error.response?.status === 404 ? 'notFound' : 'error')
        })
        return () => { active = false }
    }, [id, retry])

    useEffect(() => {
        if (status !== 'notFound') return
        const timer = window.setTimeout(() => navigate('/main/all', { replace: true }), 2000)
        return () => window.clearTimeout(timer)
    }, [status, navigate])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    // const imageList = (css, onHover, onClick, w) => {
    const imageList = () => {
        // imageData.display_code -> [`{id}`]
        return(
            <div className='flex flex-col m-4 justify-center items-center'>
                {imageLength.map((num) => 
                <img key={num} src={IMAGE_PATH + `Store/[${id}]/${num}.jpg`} alt={imageData.hanbok_name1}
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
                <SwiperSlide key={num}>
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
        setLoadedList(previous => previous.includes(num) ? previous : [...previous, num].sort((a, b) => a - b))
        setSelectedImageNumber(previous => previous ?? num)
    }

    function selectImage(num: number) {
        if (loadedList.includes(num)) {
            setSelectedImageNumber(num)
        }
    }

    function increaseIndex() {
        if (previewIndex < loadedList.length - 1) {
            setSelectedImageNumber(loadedList[previewIndex + 1])
        }
    }
    function decreaseIndex() {
        if (previewIndex > 0) {
            setSelectedImageNumber(loadedList[previewIndex - 1])
        }
    }

    if (status !== 'ready') {
        return <div className="mx-auto p-12 text-center font-preten">
            <p role={status === 'loading' ? 'status' : 'alert'}>
                {status === 'loading' ? '상품 정보를 불러오는 중입니다.'
                    : status === 'notFound' ? '상품을 찾을 수 없습니다.' : '상품 정보를 불러오지 못했습니다.'}
            </p>
            {status === 'notFound' && <p className="mt-2">2초 후 전체한복으로 이동합니다.</p>}
            {status === 'error' && <button className="m-3 underline" onClick={() => setRetry(value => value + 1)}>다시 시도</button>}
            {status !== 'loading' && <Link className="m-3 inline-block underline" to="/main/all" replace>전체한복으로 이동</Link>}
        </div>
    }

    return(
        <div className='container mx-auto flex flex-1 mobile:flex-col '
        onMouseDown={() => {}}>
            <div className='flex flex-1 flex-col justify-center items-center' id='top'>
                {/* 상단 */}
                <div className='mt-12 p-4 flex flex-1 mobile:flex-col border'>
                    {/* 모바일 크게보기 슬라이드 */}
                    <div className='hidden mobile:flex w-screen justify-center items-center'>
                        {loadedList.length ? ImageSlide() : <p role="status">{imageMessage}</p>}
                    </div>
                    {/* 데스크톱 크게보기 이미지 */}
                    <div className='mobile:hidden flex flex-col justify-center items-center'>
                        <div className='flex flex-1 items-center'>
                            <button aria-label="이전 이미지" disabled={previewIndex <= 0} onClick={decreaseIndex} className='p-1 rounded-full bg-blue-100'>
                                <GrFormPrevious size={32}>
                                </GrFormPrevious>
                            </button>
                            {selectedImageNumber !== null ? <img className='p-2 pb-0 w-full max-w-lg'
                                src={IMAGE_PATH + `Store/[${id}]/${selectedImageNumber}.jpg`}
                                alt={`${imageData.display_code} 선택 이미지`} /> : <p role="status">{imageMessage}</p>}
                            <button aria-label="다음 이미지" disabled={previewIndex < 0 || previewIndex >= loadedList.length - 1} onClick={increaseIndex} className='p-1 rounded-full bg-blue-100'>
                                <GrFormNext size={32}>
                                </GrFormNext>
                            </button>
                        </div>
                        <div className='mt-4 flex mobile:grid mobile:grid-cols-4 justify-center '>
                        {imageLength.map((num) => 
                            <img key={num} src={IMAGE_PATH + `Store/[${id}]/${num}.jpg`}
                                alt={`${imageData.display_code} 이미지 ${num} 선택`} id={num.toString()}
                                className='p-2 hover:bg-slate-200 rounded-lg w-20' 
                                onMouseEnter={() => selectImage(num)}
                                onLoad={(e) =>  { addLoadedImage(num) }}
                                onError={(e) => {
                                    ERROR_HIDE(e)
                                    setFailedImages(previous => previous.includes(num) ? previous : [...previous, num])
                                }}
                                onClick={() => selectImage(num)} />
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
