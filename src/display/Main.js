import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { GrCamera, GrHome, GrMapLocation, GrPhone } from "react-icons/gr";
import { HiClock, HiHome } from "react-icons/hi";
import { MdArrowForwardIos, MdArrowBackIosNew }  from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";

const { kakao } = window
// to-do carousel
const Main = () => {

    const prevNavigation = useRef(null)
    const nextNavigation = useRef(null)

    const isMobile = useMediaQuery({
        query: '(max-width : 760px)'
    })

    // kakao map
    useEffect(() => {
        const container = document.getElementById('map')
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(36.614393, 127.445494), //지도의 중심좌표.  
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options)
        // 마커
        const markerPosition = new kakao.maps.LatLng(36.614393, 127.445494)
        let marker = new kakao.maps.Marker({
            position: markerPosition
        })
        marker.setMap(map)
        // zoom + skyview
        const zoom = new kakao.maps.ZoomControl()
        map.addControl(zoom, kakao.maps.ControlPosition.BOTTOMRIGHT)
        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    }, [])

    const Gradient = (text, style) => {
        return(
            <p className={"text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600 " + style}>{text}</p>
        )
    }

    return(
        <div className="flex flex-col">
            {/* Logo */}
            <div className="flex flex-1 mobile:flex-col justify-center items-center my-24 mobile:my-12">
                {/* <img className='w-1/4 mobile:w-2/4' src="img/text_logo.jpg" alt="blog" /> */}
                <div className="container flex justify-center items-center p-2 w-2/5 mobile:w-auto mr-24 mobile:m-0">
                    <img className='object-cover' src="/img/text_main.png" alt="blog" />

                </div>
                <div className="flex flex-col justify-center items-center m-12 mobile:m-2">
                    {Gradient('전품목 7만원 균일가 대여', "text-4xl font-preten font-semibold mobile:text-2xl")}
                    {/* <p className="text-3xl font-preten font-semibold">전품목 7만원 균일가 대여 </p> */}
                    <p className="font-preten font-semibold pb-12 from-blue-500 to-white">
                        ( 핸드백, 신발, 액세서리 등 모두포함 )  <br />
                        ( 택배 배송비 별도)
                    </p>
                    <p className="text-2xl font-preten font-semibold text-center pb-8
                                mobile:text-lg mobile:p-2">
                        한분 한분께 최선을 다하고자 <br />
                        <b className="text-red-500">예약제</b>로 운영중입니다.
                    </p>
                    <p className="text-lg font-preten font-semibold">( 예약문의 043 - 234 - 5165 )</p>    
                </div>
            </div>

            {/* swiper */}
            <div className="container justify-center w-auto mx-24 my-8 mobile:m-4">
                <Swiper
                    pagination={true}
                    navigation={{
                        prevEl: prevNavigation.current,
                        nextEl: nextNavigation.current,
                    }}
                    onBeforeInit={{
                        prevEl: prevNavigation.current,
                        nextEl: nextNavigation.current,
                    }}
                    modules={[Navigation, Pagination]}
                    spaceBetween={12}
                    slidesPerView={isMobile ? 1 : 3}>
                    <SwiperSlide>
                        <img src="img/1.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/2.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/3.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/4.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/5.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/6.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/7.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/8.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/10.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/11.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="img/12.jpg" alt="" />
                    </SwiperSlide>
                    <div className="absolute top-1/2 -translate-y-1/2 float-left z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200 
                        mobile:p-1"
                        ref={prevNavigation}><MdArrowBackIosNew /></div>
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 float-right z-10 rounded-full border bg-white p-3 m-1 hover:bg-slate-200
                        mobile:p-1" 
                        ref={nextNavigation}><MdArrowForwardIos /></div>
                </Swiper>
            </div>

            {/* 메인정보 컨테이너 */}
            <div className="container m-16 mobile:m-2 flex flex-col ">
                <h3 className="flex flex-1 font-preten text-3xl font-semibold? border-b-2 pb-2">오시는길</h3>
                {/* 지도 컨테이너 */}
                <div className="mobile:hidden w-auto h-auto m-4 p-1">
                    <div id='map' className="w-52 f-52 relative"
                        style={{
                            width: 'auto', 
                            height: isMobile ? '300px' : '500px' }} />
                </div>
                <div className="border-b-2 flex flex-1 items-center p-4">
                    <GrMapLocation className="w-8 h-8 mobile:w-4 mobile:h-4"/>
                    <p className="m-4 w-24 text-xl font-semibold font-preten">위치</p>
                    <p className="m-4 text-xl font-preten mobile:text-base mobile:m-0">청주시 서원구 성화로 101 비단본가 (죽림동 328)</p>
                </div>
                <div className="border-b-2 flex flex-1 items-center p-4">
                    <GrPhone className="w-8 h-8 mobile:w-4 mobile:h-4"/>
                    <p className="m-4 w-24 text-xl font-semibold font-preten mobile:text-base mobile:m-2">전화번호</p>
                    <p className="m-4 text-xl font-preten mobile:text-base mobile:m-0">043 - 234 - 5165 </p>
                </div>
                <div className="border-b-2 flex flex-1 items-center p-4">
                    <HiClock className="w-8 h-8 mobile:w-4 mobile:h-4"/>
                    <p className="m-4 w-24 text-xl font-semibold font-preten mobile:text-base mobile:m-2">영업시간</p>
                    <div className="flex flex-1 mobile:flex-col">
                        <p className="m-2 text-xl font-preten mobile:text-base mobile:m-0">오전 10:30 ~ 오후 7:00</p>
                        <p className="m-2 text-xl font-preten font-semibold mobile:text-base mobile:m-0">( 매주 화요일은 휴무 )</p>
                    </div>
                </div>
                <div className="border-b-2 flex flex-1 items-center p-4">
                    {/* <HiHome className="w-8 h-8 mobile:w-4 mobile:h-4"/> */}
                    <GrHome className="w-8 h-8 mobile:w-4 mobile:h-4"/>
                    <p className="m-4 w-24 text-xl font-semibold font-preten mobile:text-base mobile:m-2">블로그</p>
                    <a className="m-4 text-xl font-preten mobile:text-base mobile:m-0" href="https://blog.naver.com/bdan_no1">blog.naver.com/bdan_no1</a>
                </div>
                <div className="border-b-2 flex flex-1 items-center p-4">
                    <GrCamera className="w-8 h-8 mobile:w-4 mobile:h-4"/>
                    <p className="m-4 w-24 text-xl font-semibold font-preten mobile:text-base mobile:m-2">인스타그램</p>
                    <a className="m-4 text-xl font-preten mobile:text-base mobile:m-0" href="https://www.instagram.com/bdanbonga/">instagram.com/bdanbonga</a>
                </div>
            </div>
            
        </div>
    )
}

export default Main