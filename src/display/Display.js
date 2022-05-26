import axios from 'axios'
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMAGE_PATH, SERVER_PATH } from "../general/General"

const Display = ({itemInfo}) => {
    // /:id -> useParams()
    const {id} = useParams()
    
    const [imageData, setImageeData] = useState({});

    useEffect(() => {
        const searchPath = `${SERVER_PATH}/${id}`
        axios.get(searchPath).then((result) => {
            setImageeData(result.data[0])
            console.log(result.data[0])
        })
    }, [])

    const imageList = () => {
        
        return(
            <div>
                <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/1.jpg`} alt={imageData.bs_gsname1} 
                    className='p-4 m-4' width={800} />
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
            <div className='flex flex-1 flex-col justify-center'>
                <h2 className='text-2xl p-4'>{imageData.bs_gsname1}</h2>
                {/* <img src={IMAGE_PATH + `Store/[${imageData.bs_code}]/1.jpg`} alt={imageData.bs_gsname1} 
                    width={800} /> */}
                {imageList()}
            </div>
            <div className='m-8 '>
                <div>
                    <p>대여가능 리스트</p>
                </div>
                <div>
                    <p>옆에 리스트들</p>
                </div>
            </div>
        </div>
    )
}

export default Display