import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


const Parent = (props) => {
    const {id} = useParams();

    useEffect(() => {
      console.log(id)
      console.log(props.type)
    }, [])
    

    return(
        <div>
            <p>props.keyword : {props.keyword}</p>
            <p>useParms.id : {id}</p>
            
            
        </div>
    )
}

export default Parent