import React from "react"

const Display = (itemInfo) => {
    const info = itemInfo

    return(
        <div>
            {info ? info : 'no item'}
        </div>
    )
}

export default Display