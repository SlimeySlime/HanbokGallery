import React from "react"
import useEmblaCarousel from 'embla-carousel-react'

const Main = () => {

    // const [emblaRef] = useEmblaCarousel()

    return(
        <div className="flex flex-col flex-1" data-carouse='static'>
            <div className="overflow-hidden">
                

            </div>
            <img className='container-fluid w-auto' src="img/front.jpg" alt="" />
        </div>
    )
}

export default Main