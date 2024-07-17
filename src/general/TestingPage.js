import React, { useRef } from "react";
import Carousel from "./Carousel";
// import overlay2 from '../../public/img/overlay';
// import { IMAGE_PATH } from "./ConfigDeprecate";

const TestingPage = () => {
    const items = ['one', 'two', 'three', 'four', 'five']
    const disListRef = useRef([])

    const setting = {
      dragSpeed: 1.25,
      itemWidth: 300,
      itemHeight: 180,
      itemSideOffsets: 15,
    }

    const itemStyle = {
      width: `${setting.itemWidth}px`,
      height: `${setting.itemHeight}px`,
      margin: `0px ${setting.itemSideOffsets}px`
    }

    const Dis = ({title, refIndex}) => {
      return(
      <div className="p-16 flex flex-col bg-slate-50 border rounded justify-center items-center" 
        ref={el => disListRef.current[refIndex] = el}>
          <h1 className="flex flex-1 text-4xl">{title}</h1>
          <p className="text-4xl">균일가 5만원</p>
      </div>
      )
    }

    const toIndex = (target=6) => {      
      disListRef.current[target]?.scrollIntoView({})
    }

    return(
      <div>
        <button className="m-4 p-2 bg-slate-200 rounded-md"
          onClick={() => {toIndex()}}>
            click to 6
        </button>
        <Dis title='판매상품1' refIndex={0}></Dis>
        <Dis title='판매상품2' refIndex={1}></Dis>
        <Dis title='판매상품3' refIndex={2}></Dis>
        <Dis title='판매상품4' refIndex={3}></Dis>
        <Dis title='판매상5품' refIndex={4}></Dis>
        <Dis title='판매상품6' refIndex={5}></Dis>
        <Dis title='판매상품6' refIndex={6}></Dis>

      </div>
    )
}

export default TestingPage