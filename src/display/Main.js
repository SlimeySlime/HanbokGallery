import React from "react"
// import useEmblaCarousel from 'embla-carousel-react'

// to-do carousel
const Main = () => {

    // const [emblaRef] = useEmblaCarousel()

    return(
        <div className="flex flex-col flex-1">
            <h1>비단본가</h1>
            {/* <img className='container-fluid w-auto' src="img/front.jpg" alt=" /> */}
            <img className="w-52" src="img/back.jpg" alt="blog" />
            {/* <img className='container-fluid w-auto' src="img/blog.jpg" alt="blog" /> */}
        </div>
    )
}

export default Main