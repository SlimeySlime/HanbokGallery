import React from "react";
// import overlay2 from '../../public/img/overlay';
import { IMAGE_PATH } from "./General";

const TestingPage = () => {
    

    return(
        <div className="m-16 p-5 flex justify-center space-x-12">
            <div className="relative w-80 h-80 max-w-full">
                <img className="absolute blur-sm inset-0 w-full rounded" src={IMAGE_PATH + `Store/[A005]/1.jpg`} width={500} alt="" />
                <div className="absolute w-full h-full flex bg-slate-400 bg-opacity-50 justify-center items-center">
                    <p className="absolut text-white text-xl font-sans font-semibold">해당상품은 대여불가능합니다.</p>    
                </div>
                {/* <p className="absolute text-black">해당상품은 대여불가능합니다.</p> */}
                <img className="hidden absolute inset-0 w-full rounded" src="img/overlay.png" alt="overlay" />

            </div>
        </div>
    )
}

export default TestingPage