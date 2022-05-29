import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMAGE_PATH, SERVER_PATH } from "../general/General"
import RentalCalender from './RentalCalender'

const Display = ({itemInfo}) => {
    // /:id -> useParams()
    const {id} = useParams()
    // 약간 무식한 방법
    const imageLength = [1,2,3,4,5,6,7,8,9]

    const [imageData, setImageeData] = useState({})
    const [previewIndex, setPreviewIndex] = useState(1)

    useEffect(() => {
        const searchPath = `${SERVER_PATH}/${id}`
        axios.get(searchPath).then((result) => {
            setImageeData(result.data[0])
            console.log(result.data[0])
        })
    }, [])

    const imageList = (css, onHover, onClick, w) => {
        
        return(
            <div>
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/1.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/2.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/3.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/4.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/5.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/9.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/12.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} onError={console.log('no image')} />
            </div>
        )
    }

    return(
        <div className='container mx-auto flex flex-1 '>
            <div className='flex flex-1 flex-col justify-center items-center'>
                {/* 타이틀 */}
                {/* <h2 className='text-3xl ml-2 pt-4 font-classic'>{imageData.bs_gsname1?.split(' ')[0]} 그리고 {imageData.bs_gsname2?.split(' ')[0]} </h2> */}
                <h2 className='text-3xl ml-2 pt-5 font-samlip'>
                    {imageData.bs_gsname1?.split(' ')[0]} - {imageData.bs_gsname2?.split(' ')[0]} 
                </h2>
                {/* <h2 className='text-3xl ml-2 pt-4 font-katuri'>{imageData.bs_gsname1?.split(' ')[0]}, {imageData.bs_gsname2?.split(' ')[0]} </h2> */}
                
                {/* 크게보기 이미지 */}
                <div className='flex flex-col justify-center items-center'>
                    <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/${previewIndex}.jpg`} alt={imageData.bs_code} 
                    width={700}
                    className='p-16 pb-0' />
                    <div className='flex justify-center mt-4'>
                    {imageLength.map((num) => 
                        <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/${num}.jpg`} alt={imageData.bs_code} id={num}
                            width={100}
                            onMouseEnter={(e) => {setPreviewIndex(e.target.id)}}
                            className='p-2 hover:bg-slate-200 rounded-lg' />    
                    )}
                    </div>
                </div>
                <div className='mt-10'>
                    {imageList()}

                </div>
            </div>
            {/* 좌측 */}
            <div className='m-8 hidden'>
                <div>
                    <input type="date" name="event-date"
                        className='border '/>
                    <RentalCalender></RentalCalender>
                </div>
                <div>
                    <p>옆에 리스트들</p>
                </div>
            </div>
        </div>
    )
}

export default Display