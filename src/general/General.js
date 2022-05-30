
const SERVER_PATH = process.env.NODE_ENV === 'production' ? '/store' : 'http://localhost:3003/store'
const IMAGE_PATH = 'https://storage.googleapis.com/hanbok.bdanbonga.com/'
const DEV_SERVER_PATH = 'http://localhost:3003/store'
const ERROR_HIDE = (e) => {
    e.target.style.display = 'none'
}

const TYPE_TO_KOREAN = (type) => {
    switch (type) {
        case 'bride':
            return '신부'
        case 'parent':
            return '혼주'        
        case 'guest':
            return '하객'
        case 'best' :
            return '인기'
        case 'all':
            return '전체'
        default:
            return '에러'
    }
}

export {IMAGE_PATH, SERVER_PATH, DEV_SERVER_PATH, ERROR_HIDE, TYPE_TO_KOREAN}