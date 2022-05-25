import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"

function getHanbok2() {
    axios.get('/store')
    .then((result) => {
        console.log(result)
    })
}

const Marriage = (props) => {

    const [testImage, setTestImage] = useState();
    const [blogData, setBlogData] = useState({});
    const {id} = useParams();

    const blogDataPath = process.env.NODE_ENV === 'production' ? '/store' : 'http://localhost:3003/store'

    useEffect(() => {
        getHanbok()
        // console.log(`props : ${props}`)
        console.log(props)
        console.log(`props.type : ${props.type}`)
    }, [])

    function getHanbok() {
        axios.get('http://localhost:3003/store', {
            params: {
                bs_part : '신부',
            }
        })
        .then((result) => {
            console.log(result)
        })
    }
    function getAllHanbok() {
        axios.get('http://localhost:3003/store')
        .then((result) => {
            console.log(result)
        })
    }

    return(
        <div className="container mx-auto">
            <h3 className="text-2xl m-4">신부 한복</h3>
            <button className="btn btn-primary ml-4"
                onClick={() => {getHanbok()}}>조건부 불러오기
            </button>
            <button className="btn btn-primary ml-4"
                onClick={() => {getAllHanbok()}}>모두 불러오기
            </button>
            <div className="container grid grid-cols-3 md:grid-cols-6 gap-10">
                <div className="mt-4 p-2 hover:shadow-lg">
                    <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">가지보라 긴당의</p>
                    <p className="inline-block font-semibold">80,000 원</p>
                    <p className="ml-1 inline font-thin text-slate-600 line-through">100,000 원</p>
                </div>
                <div className="mt-4">
                    <img className="w-full rounded shadow-md" src="img/[A76]/[A76] 핑크백합 웨딩드레스 (3).jpg" width={500} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">핑크백합</p>
                    <p className="inline font-semibold">80,000 원</p>
                    <p className="ml-1 inline font-thin text-slate-600 line-through">100,000 원</p>
                </div>
                <div className="mt-4">
                    <img className="w-full rounded shadow-md" src="img/[A77]/[A77] 민트은박당의 크림레이스 오간쟈덧날개 (3).jpg" width={500} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">민트은박당의</p>
                    <p className="font-semibold">80,000 원</p>
                </div>
                <div className="mt-4">
                    <img className="w-full rounded shadow-md" src="https://s3.ap-northeast-2.amazonaws.com/bdanbonga.hanbok.com/%EB%84%A4%EC%9D%B4%EB%B2%84%EC%8A%A4%ED%86%A0%EC%96%B4/%5BA001%5D+%ED%95%91%ED%81%AC%EC%9E%A5%EB%AF%B8%EC%88%8F%EB%8B%B9%EC%9D%98%EB%A8%B9%EC%83%89%EB%A7%A4%ED%99%94/2021-11-18-19-12-35-746.jpg" 
                        height={'auto'} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">가지보라 긴당의</p>
                    <p className="font-semibold">70,000 원</p>
                </div>
                <div className="mt-4">
                    <img className="w-full rounded shadow-md" src="https://storage.googleapis.com/bdan-hanbok/%EB%84%A4%EC%9D%B4%EB%B2%84%EC%8A%A4%ED%86%A0%EC%96%B4/%5BA008%5D%20%ED%95%91%ED%81%AC%EC%9E%94%EA%BD%83%2C%EB%82%A8%EC%83%89%EA%B0%88%EB%9E%98/1.jpg" width={500} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">핑크잔꽃 남색갈래</p>
                    <p className="font-semibold">70,000 원</p>
                </div>
                <div className="mt-4">
                    <img className="w-full rounded shadow-md" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                    <p className="mt-1 text-xs tracking-tight">신부한복</p>
                    <p className="font-sans font-semibold">가지보라 긴당의</p>
                    <p className="font-semibold">70,000 원</p>
                </div>
                
                <img className="w-full shadow-lg" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full shadow-md" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                <img className="w-full rounded" src="img/[A75]/[A75] 가지보라긴당의 국화꽃향기 (3).jpg" width={500} alt="" />
                
            </div>
        </div>
    )
}

export default Marriage;