import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

// AiOutlineWarning
const CookieWanring = ({warningClose}) => {

    return(
        <div className="fixed bottom-12 right-12 mobile:right-0 w-58 h-32 items-center justify-center z-50">
            <div className="p-4 bg-blue-400 items-center justify-center rounded-lg">
                <AiOutlineWarning className="float-right m-1 w-10 h-10" color=""/>
                <p className="font-preten text-lg font-semibold text-center">메뉴에서 행사날짜를 <br /> 먼저 선택해주세요</p>
                <p className="my-1 font-sans text-xs">행사날짜를 선택하시면 <br /> 대여가능 여부를 확인할 수 있습니다.</p>
                <div className="flex justify-end">
                    <button className="mt-2 ml-2 bg-white rounded p-2 text-sm" onClick={() => {warningClose(false)}}>알겠습니다</button>
                    <button className="mt-2 ml-2 bg-white rounded p-2 text-sm" onClick={() => {warningClose(false)}}>닫기</button>
                </div>
            </div>
            
        </div>
    )
}

export default CookieWanring