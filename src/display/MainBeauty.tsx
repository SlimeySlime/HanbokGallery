
import React, { useEffect, useState } from "react";
import { GrCamera, GrHome, GrMapLocation, GrPhone } from "react-icons/gr";
import { HiClock } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";


const MainBeautiy = () => {

    // kakao map
    useEffect(() => {
        const container = document.getElementById('map')
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(36.614393, 127.445494), //지도의 중심좌표.  
            level: 4 //지도의 레벨(확대, 축소 정도)
        };
        const map = new window.kakao.maps.Map(container, options)
        // 마커
        const markerPosition = new window.kakao.maps.LatLng(36.614393, 127.445494)
        let marker = new window.kakao.maps.Marker({
            position: markerPosition
        })
        marker.setMap(map)
        // zoom + skyview
        const zoom = new window.kakao.maps.ZoomControl()
        map.addControl(zoom, window.kakao.maps.ControlPosition.BOTTOMRIGHT)
        var mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    }, [])

    const isMobile = useMediaQuery({
        query: '(max-width : 760px)'
    })

    const Gradient = (text: String, style: String) => {
        return(
            <p className={"text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-600 " + style}>{text}</p>
        )
    }
    return(
        <div className="flex flex-col">
            {/* 메인 이미지 */}
            <div className="flex flex-1 bg-main_page_image bg-cover" id="image_holder">
                <div className="flex flex-1 h-52">
                    hi

                </div>
                {/* <img src="img/testbackground.jpg" alt="" /> */}
            </div>
            <div className="">

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

export default MainBeautiy

