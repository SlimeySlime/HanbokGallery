import React from "react"

const Footer = () => {
    return(
    <footer class="p-4 sticky mb-0 bg-slate-100 rounded-lg shadow-lg md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022
         <a href="https://blog.naver.com/bdan_no1" class="hover:text-green-600"> 비단본가</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://blog.naver.com/bdan_no1" class="mr-4 hover:underline md:mr-6 ">Blog</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">연락처</a>
            </li>
            <li>
                <a href="http://kko.to/NgJyDhxJu" class="hover:underline">오시는 길</a>
            </li>
        </ul>
    </footer>
    )
}

export default Footer;