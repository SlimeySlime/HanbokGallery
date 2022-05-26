
const SERVER_PATH = process.env.NODE_ENV === 'production' ? '/store' : 'http://localhost:3003/store'
const IMAGE_PATH = 'https://storage.googleapis.com/hanbok.bdanbonga.com/'
const DEV_SERVER_PATH = 'http://localhost:3003/store'

export {IMAGE_PATH, SERVER_PATH, DEV_SERVER_PATH}