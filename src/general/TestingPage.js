import React from "react";
import Carousel from "./Carousel";
// import overlay2 from '../../public/img/overlay';
import { IMAGE_PATH } from "./ConfigDeprecate";

const TestingPage = () => {
    const items = ['one', 'two', 'three', 'four', 'five']

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

    return(
        <div className="container p-16 flex flex-col bg-slate-50 border rounded justify-center items-center">
            <h1 className="flex flex-1 text-4xl">판매 상품</h1>
            <p className="text-4xl">균일가 5만원</p>
        </div>
    )
}

export default TestingPage