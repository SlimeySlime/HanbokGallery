import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useParams } from "react-router-dom"
import {IMAGE_PATH, SERVER_PATH, ERROR_HIDE} from '../general/General';

const Marriage = (props) => {
    // const {id} = useParams();
    // 행사일자에 대여나가는 한복리스트 
    const [hanbokList, setHanbokList] = useState([]);
    const [blogData, setBlogData] = useState([]);
    const [storeData, setStoreData] = useState([]);

    // const blogDataPath = process.env.NODE_ENV === 'production' ? '/store' : 'DEV_SERVER_PATH'
    const blogDataPath = SERVER_PATH
    const IMAGE_PATH = 'https://storage.googleapis.com/hanbok.bdanbonga.com/'

    useEffect(() => {
        getHanbok()
        // getAllHanbok()
    }, [])

    useEffect(() => {
        console.log('current blog data length : ', blogData.length)
    }, [blogData])
    // search by keyword
    function getHanbok() {
        axios.get('http://localhost:3003/store', {
            params: {
                bs_part : '신부',
                bs_code : 'A',
            }
        })
        .then((result) => {
            console.log(result.data[0])
            setBlogData(result.data[0]);
        })
    }
    // All
    function getAllHanbok() {
        axios.get(blogDataPath)
        .then((result) => {
            console.log(result.data)
            setBlogData(result.data[0]);
            // setStoreData(result.data);
        })
    }

    // 이미지경로 - IMAGE_PATH + Store/[A001]/1.jpg
    return(
        <div className="container mx-auto">
            <h3 className="text-2xl font-katuri m-4">신부 한복</h3> 
            <div className="container grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-10 ">
                {blogData.map((item) => 
                <div className="cursor-pointer"
                    onError={(e) => {console.log(e)}} id='image link container'>

                <Link to={`/display/${item.bs_code}`}>
                    <div className="mb-4 p-2 hover:shadow-lg"> 
                        <img className="w-full rounded" src={IMAGE_PATH + `Store/[${item.bs_code}]/1.jpg`} width={500} alt="" />
                        <p className="mt-1 text-xs tracking-tight">신부한복</p>
                        <p className="font-sans">[{item.bs_code}]{item.bs_gsname1?.split(' ')[0]}</p>
                        <p className="font-sans">{item.bs_gsname2?.split(' ')[0]}</p>
                        <p className="inline-block font-sans font-semibold">80,000 원</p>
                        <p className="ml-1 inline font-sans font-thin text-slate-600 line-through">100,000 원</p>
                    </div>
                </Link>  
                </div>
                )}
            </div>
        </div>
    )
}

export default Marriage;