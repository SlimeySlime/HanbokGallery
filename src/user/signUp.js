import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

export const SignUp = () => {

    const [userInfo, setUserInfo] =  useState()

    const userInfoChange = (type, info) => {

        setUserInfo({
            ...userInfo,
            [type]: info
        })
    }
    useEffect(() => {

    }, [])

    const signUpButton = () => {
        // TODO
    }

    return(
        <div className="container flex flex-1 m-12 mt-20 justify-center">
            <div className="min-w-md flex-col">
                <div className="flex flex-col p-2 rounded ">

                    <p className="p-1 text-xs">아이디</p>
                    <input className="p-2 border-2" type="text" 
                        onChange={(e) => {userInfoChange("id", e.target.value)}}
                        placeholder="id"/>

                    <p className="p-1 text-xs">이메일</p>
                    <input className="p-2 border-2" type="text" 
                        onChange={(e) => {userInfoChange("email", e.target.value)}}
                        placeholder="email"/>

                    <p className="p-1 text-xs">비밀번호</p>
                    <input className="p-2 border-2" type="text" 
                        onChange={(e) => {userInfoChange("password", e.target.value)}}
                        placeholder="password"/>
                </div>
                <div className="m-2 p-4 flex w-full rounded bg-blue-300 justify-center font-bold font-sans"
                    onClick={() => {signUpButton()}}>
                    회원가입
                </div>
            </div>
        </div>
    )
}