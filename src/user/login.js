
import React, { useEffect } from "react"
import { useState } from "react"

export const Login = () => {

    const [userInfo, setUserInfo] = useState({})

    const userInfoChange = (type, info) => {

        setUserInfo({
            ...userInfo,
            [type]: info
        })
    }

    useEffect(() => {
        console.log(userInfo)
    }, [userInfo])
    

    return (
        <div className="container flex flex-1 m-12 mt-20 justify-center">
            <div className="min-w-md flex-col">
                <div className="flex flex-col p-2 rounded ">
                    <p className="p-1 text-xs">아이디</p>
                    <input className="p-2 border-2" type="text" 
                        onChange={(e) => {userInfoChange("id", e.target.value)}}
                        placeholder="id"/>
                    <p className="p-1 text-xs">비밀번호</p>
                    <input className="p-2 border-2" type="text" 
                        onChange={(e) => {userInfoChange("password", e.target.value)}}
                        placeholder="id"/>
                </div>
                <div className="p-4 flex w-full rounded bg-blue-300 justify-center font-bold font-sans">
                    로그인
                </div>
                <div>
                    <div>이메일로 회원가입</div>
                    <div className="float-right"> 비밀번호 찾기</div>
                </div>
            </div>
        </div>
    )
}