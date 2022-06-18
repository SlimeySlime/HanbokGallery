import React, { useEffect, useRef, useState } from "react"
import { useMediaQuery } from 'react-responsive'
import { GrCamera, GrHome, GrMapLocation, GrPhone } from "react-icons/gr";
import { HiClock } from "react-icons/hi";
// import AliceCarousel from 'react-alice-carousel';
// import 'react-alice-carousel/lib/alice-carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import "swiper/css/pagination";
import "swiper/css/navigation";

const { kakao } = window
// to-do carousel
const Main = () => {

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

    return(
        <div className="flex flex-col">
            {/* Logo */}
            <div className="flex flex-1 justify-center">
                <img className='w-1/4 mobile:w-2/4' src="img/text_logo.jpg" alt="blog" />
            </div>

            {/* swiper */}
            <div className="container justify-center w-auto mx-24 my-8 mobile:m-4">
                <Swiper
                    pagination={true}
                    navigation={true}
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
                </Swiper>
            </div>

            {/* 메인정보 컨테이너 */}
            <div className="container m-16 mobile:m-2 flex flex-col ">
                <h3 className="flex flex-1 font-preten text-3xl font-semibold? border-b-2 pb-2">오시는길</h3>
                {/* 지도 컨테이너 */}
                <div className="w-auto h-auto m-4 p-1">
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
                    <p className="m-4 text-xl font-preten mobile:text-base mobile:m-0">043 - 234 - 5165 &nbsp; / &nbsp; 010 - 6847 - 5165</p>
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
// kakao - js key
// bc21b69f1070ca260233e529e650b410

{/* // <!-- * 카카오맵 - 지도퍼가기 -->
// <!-- 1. 지도 노드 -->
// <div id="daumRoughmapContainer1655022337361" class="root_daum_roughmap root_daum_roughmap_landing"></div>

// <!--
// 	2. 설치 스크립트
// 	* 지도 퍼가기 서비스를 2개 이상 넣을 경우, 설치 스크립트는 하나만 삽입합니다.
// -->
// <script charset="UTF-8" class="daum_roughmap_loader_script" src="https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js"></script>

// <!-- 3. 실행 스크립트 -->
// <script charset="UTF-8">
// 	new daum.roughmap.Lander({ */}
{/* // 		"timestamp" : "1655022337361",
// 		"key" : "2ak6y",
// 		"mapWidth" : "640",
// 		"mapHeight" : "360"
// 	}).render();
// </script> */}

{/* <div style="font:normal normal 400 12px/normal dotum, sans-serif; width:640px; height:392px; color:#333; position:relative"><div style="height: 360px;"><a href="https://map.kakao.com/?urlX=599623.0&amp;urlY=865780.0&amp;itemId=982530562&amp;q=%EB%B9%84%EB%8B%A8%EB%B3%B8%EA%B0%80&amp;srcid=982530562&amp;map_type=TYPE_MAP&amp;from=roughmap" target="_blank"><img class="map" src="http://t1.daumcdn.net/roughmap/imgmap/60acafe04a631b74a66c6f4346804a91eed5bc924c22df1e7255246a93c481cd" width="638px" height="358px" style="border:1px solid #ccc;"></a></div><div style="overflow: hidden; padding: 7px 11px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 0px 0px 2px 2px; background-color: rgb(249, 249, 249);"><a href="https://map.kakao.com" target="_blank" style="float: left;"><img src="//t1.daumcdn.net/localimg/localimages/07/2418/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" style="display:block;width:72px;height:16px"></a><div style="float: right; position: relative; top: 1px; font-size: 11px;"><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;srcid=982530562&amp;confirmid=982530562&amp;q=%EB%B9%84%EB%8B%A8%EB%B3%B8%EA%B0%80&amp;rv=on" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">로드뷰</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com/?from=roughmap&amp;eName=%EB%B9%84%EB%8B%A8%EB%B3%B8%EA%B0%80&amp;eX=599623.0&amp;eY=865780.0" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">길찾기</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com?map_type=TYPE_MAP&amp;from=roughmap&amp;srcid=982530562&amp;itemId=982530562&amp;q=%EB%B9%84%EB%8B%A8%EB%B3%B8%EA%B0%80&amp;urlX=599623.0&amp;urlY=865780.0" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">지도 크게 보기</a></div></div></div> */}


export default Main