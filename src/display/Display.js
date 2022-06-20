import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMAGE_PATH, SERVER_PATH, ERROR_HIDE } from "../general/General"
import RentalTemplate from '../general/RentalTemplate'

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

    const imageList = (css, onHover, onClick, w) => {
        
        return(
            <div className='flex flex-col justify-center items-center'>
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/1.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3'  />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/2.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/3.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/4.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/5.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/6.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/7.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/8.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/9.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4 mb-12 border rounded-lg w-2/3' width={800} />
            </div>
        )
    }

    const sizes = (size) => {
        let sizes = size?.split(/[.,]+/)
        // bigos.unshift(bigos[0] - 11)
        return sizes.join(', ')
    }

    return(
        <div className='container mx-auto flex flex-1 mobile:flex-col '>
            <div className='flex flex-1 flex-col justify-center items-center'>
                {/* 상단 */}
                <div className='mt-12 p-4 flex mobile:flex-col border'>
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
                                onClick={(e) => {setPreviewIndex(e.target.id)}} />    
                        )}
                        </div>
                    </div>
                    {/* 좌측 */}
                    <div className='m-4 mb-12 w-auto mobile:w-auto'>
                        {/* 타이틀 */}
                        <h2 className='text-3xl ml-2 m-4 mb-8 font-samlip'>
                            [{imageData.bs_code}] {imageData.bs_gsname1?.split(' ')[0]} {imageData.bs_gsname2?.split(' ')[0]} 
                        </h2>
                        <div className='mb-12 p-4 border'>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.bs_gskind1} - {imageData.bs_gsname1?.split(' ')[0]}</p>
                            <p className='pt-4 text-2xl font-katuri'>size - {imageData.bs_bigo && sizes(imageData.bs_bigo)}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.bs_gsname2 && `${imageData.bs_gskind2} - ${imageData.bs_gsname2}`}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.bs_gsname3 && `${imageData.bs_gskind3} - ${imageData.bs_gsname3}`}</p>
                            <p className='pt-4 text-2xl font-katuri'>{imageData.bs_gsname4 && `${imageData.bs_gskind4} - ${imageData.bs_gsname4}`}</p>
                            {/* <p className='pt-4 text-2xl'>{imageData.bs_bigo}</p> */}
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
                        <div>
                            
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

export default Display