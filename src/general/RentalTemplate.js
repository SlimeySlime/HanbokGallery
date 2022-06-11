import React from "react";

const RentalTemplate = () => {

    return(
        <div className="mt-12 m-4 flex-1 justify-center items-center">
            <img src="/img/rentaling.jpg" alt="" />
            <h2 className="mt-12  text-3xl font-preten font-semibold">예약전 필독사항</h2>

            <p className="p-2 mt-4 text-katuri font-semibold text-2xl mobile:xl">※ 주문시</p>
            <p className="font-preten font-semibold text-lg mobile:md">
                - 대여기간 : 2박 3일 <br />
                - 사이즈(키, 가슴둘레, 화장, 신발사이즈)를 알려주세요. <br />
                - 주말행사 : 수요일 택배 출고로 목요일 또는 금요일에 도착합니다. <br />
                - 평일행사 : 행사 3일전 택배가 출발합니다. <br />
                - 치마길이와 신발높이는 키를 기준으로 준비해드립니다. (신발 높이를 원하시면 요청해주세요) <br />
                - 행사일자에 대여가 가능한지 문의해서 한번 더 확인해주세요. <br />
            </p>

            <p className="p-2 mt-4 text-katuri font-semibold text-2xl mobile:xl">※ 반납시</p>
            <p className="font-preten font-semibold text-lg mobile:md">
                - 행사 다음날 방문 수거가 자동으로 접수됩니다 <br />
                - 주말행사 : 월요일에 방문 수거가 자동으로 접수됩니다 <br />
                - 한복과 구성품을 상자에 담아서, 보내드린 택배박스에 넣어주세요 <br />
                - 택배 기사님 전화를 꼭 받아주세요 <br />
                - 고객님 사정으로 반납이 연체 될 경우 연체료가 부과될 수 있습니다 
            </p>

            <p className="p-2 mt-4 text-katuri font-semibold text-2xl mobile:xl">※ 대여박스 구성품</p>
            <p className="font-preten font-semibold text-lg mobile:md">
                - 한복, 속바지, 버선, 속치마, 노리개, 뒤꽂이(올림머리 선택시), 브로치, 신발, 가방 <br />
                - 저고리의 자수에 따라 브로치 여부가 결정됩니다.  <br />
                (자수가 있는 경우 별도로 넣어드리지 않습니다)   <br />
            </p>

            <p className="p-2 mt-4 text-katuri font-semibold text-2xl mobile:xl">※ 참고사항</p>
            <p className="font-preten font-semibold text-lg mobile:md">
                - 대여 소품은 사진과 다를 수 있으며, 선택하신 한복과 어울리는 것으로 보내드립니다. <br />
                - 신발 높이는 치마길이와 키에 따라서 1cm, 3cm, 7cm, 11cm로 조정됩니다. <br />
                - 모니터와 모바일의 색상과 조명에 따라 한복 색상에 차이가 날 수 있습니다. <br />
            </p>

            <p className="p-2 mt-4 text-katuri font-semibold text-2xl mobile:xl">※ 취소, 교환, 환불안내</p>
            <p className="font-preten font-semibold text-lg mobile:md">
                - 상품을 주문하시면 행사일에 맞춰 대여를 확정하기때문에 <br />
                 해당 한복을 다른 고객님의 예약을 못 받는 상태이므로 환불이 어렵습니다. <br />
                - 행사 4주전 : 100% 환불 <br />
                - 행사 2주전 : 50% 환불 <br />
                - 행사 1주전 : 환불 불가 <br />
            </p>

        </div>
    )
}

export default RentalTemplate