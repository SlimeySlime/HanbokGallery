import { useEffect, useState } from "react"


const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        hegiht: window.innerHeight,
    })

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                hegiht: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)
        // clean up at component umount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        console.log(screenSize)
    }, [screenSize])

    return screenSize
}

export default useScreenSize