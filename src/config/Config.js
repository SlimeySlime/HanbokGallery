
// const SERVER_PATH = process.env.NODE_ENV === 'production' ? 'slimeyslime.net/api/spring' : 'http://localhost:8080'
const SERVER_PATH =  'http://slimeyslime.net/api/spring'
// const SERVER_PATH =  'http://slimeyslime.net/api/bdanbonga'
const HANBOK_API = SERVER_PATH + "/hanboks/all"
const GALLERY_API = SERVER_PATH + "/gallery/all"
// const GALLERY_API = SERVER_PATH + "/gallery"
const RENTAL_ITEM_API = SERVER_PATH + "/rentals/rentalItems"

// const SERVER_PATH = 'https://slimeyslime.net/api/bdanbonga'
const IMAGE_PATH = 'https://storage.googleapis.com/hanbok.bdanbonga.com/'
// const IMAGE_PATH = 'https://s3.ap-northeast-2.amazonaws.com/bdanbonga.hanbok.com/'
const DEV_SERVER_PATH = 'http://localhost:3000/bdanbonga'
const ERROR_HIDE = (e) => {
    e.target.style.display = 'none'
}
/**
 * bride - 신부
 * groom - 신랑
 * parent - 혼주
 * guest - 하객
 * all - 전체
 */
const TYPE_TO_KOREAN = (type) => {
    switch (type) {
        case 'bride':
            return '신부'
        case 'groom':
            return '신랑'
        case 'parent':
            return '혼주'        
        case 'guest':
            return '하객'
        case 'best' :
            return '인기'
        case 'all':
            return '전체'
        default:
            return type
    }
}
/**
* DATE 오브젝트에 날짜 계산
* @param {date} date date 오브젝트
* @param {days} days +- 날짜
*/
const DATE_ADD = (date, days) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + days)
    return newDate
}
/**
* DATE를 SQL STRING으로 변환 (Wed Jun 15 2022 -> 20220615)
* @param {date} date 오브젝트
*/
const DATE_TO_SQLSTRING = (date) => {
    const sqlStr = date.toISOString().split('T')[0].replace(/-/gi, '')
    return sqlStr
}

function HANBOK_MAP(hanbokList){
    let hanbokMap = new Map()
    hanbokList.map((item) => {
      hanbokMap[item.gs_name] = item
    })
    return hanbokMap
}

export {IMAGE_PATH, SERVER_PATH, DEV_SERVER_PATH, HANBOK_API, GALLERY_API, RENTAL_ITEM_API,
    ERROR_HIDE, TYPE_TO_KOREAN, DATE_ADD, DATE_TO_SQLSTRING, HANBOK_MAP}