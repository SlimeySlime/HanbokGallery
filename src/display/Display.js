import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMAGE_PATH, SERVER_PATH, ERROR_HIDE } from "../general/General"
import RentalCalender from './RentalCalender'

const Display = ({itemInfo}) => {
    // /:id -> useParams()
    const {id} = useParams()
    // 약간 무식한 방법
    const imageLength = [1,2,3,4,5,6,7,8,9]

    const [imageData, setImageData] = useState({})
    const [previewIndex, setPreviewIndex] = useState(1)

    useEffect(() => {
        const searchPath = `${SERVER_PATH}/${id}`
        axios.get(searchPath).then((result) => {
            setImageData(result.data[0])
            console.log(result.data[0])
        })
    }, [])

    // function imageError(e){
    //     console.log(e)
    //     e.target.style.display = 'none'
    // }
    

    const imageList = (css, onHover, onClick, w) => {
        
        return(
            <div className='flex flex-col justify-center items-center'>
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/1.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3'  />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/2.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/3.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/4.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/5.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/6.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/7.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/8.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} onError={(e) => {ERROR_HIDE(e)}}/>
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/9.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 border rounded-lg w-2/3' width={800} onError={(e) => {ERROR_HIDE(e)}}/>
            </div>
        )
    }

    return(
        <div className='container mx-auto flex flex-1 mobile:flex-col '>
            <div className='flex flex-1 flex-col justify-center items-center'>
                {/* 타이틀 */}
                <h2 className='text-3xl ml-2 m-4 font-samlip'>
                    {imageData.bs_gsname1?.split(' ')[0]} - {imageData.bs_gsname2?.split(' ')[0]} 
                </h2>
                
                {/* 크게보기 이미지 */}
                <div className='flex flex-col justify-center items-center'>
                    <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/${previewIndex}.jpg`} alt={imageData.bs_code} 
                    // width={400}
                    className='p-2 pb-0 w-full max-w-lg' />
                    <div className='mt-4 flex mobile:grid mobile:grid-cols-4 justify-center '>
                    {imageLength.map((num) => 
                        <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/${num}.jpg`} alt={imageData.bs_code} id={num}
                            // width={50} 
                            className='p-2 hover:bg-slate-200 rounded-lg w-20' 
                            onMouseEnter={(e) => {setPreviewIndex(e.target.id)}}
                            onClick={(e) => {setPreviewIndex(e.target.id)}}
                            onError={(e) => {ERROR_HIDE(e)}} />    
                    )}
                    </div>
                </div>
                <div className='mt-10 '>
                    {imageList()}

                </div>
            </div>
            {/* 좌측 */}
            <div className='w-1/4 mobile:w-full m-12'>
                <div className='mt-12'>
                    <p className='flex flex-1 pb-4 text-2xl font-samlip2'>{imageData.bs_gskind1} - {imageData.bs_gsname1?.split(' ')[0]}</p>
                    <p className='pb-4 text-2xl font-alice'>{imageData.bs_gskind2} - {imageData.bs_gsname2?.split(' ')[0]}</p>
                    <p className='pb-4 text-2xl'>{imageData.bs_gsname3 && `${imageData.bs_gskind3} - ${imageData.bs_gsname3}`}</p>
                    <p className='pb-4 text-2xl'>{imageData.bs_gsname4 && `${imageData.bs_gskind4} - ${imageData.bs_gsname4}`}</p>
                    <p className='pb-4 text-2xl'>{imageData.bs_bigo}</p>
                </div>
                <div>
                    <p>옆에 리스트들</p>
                </div>
            </div>
        </div>
    )
}

export default Display