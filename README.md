비단본가 한복갤러리
=========
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- - - - - -

## 메인
bootstrap -> tailwindcss로 교체
```js
screens: {
    'mobile' : {'max': '640px'},
},
```
kakao map api 사용 (모바일은 hidden)

swiperjs로 간단하게 슬라이드 제작

*****

## redux
> 1. 전체한복
> 2. 갤러리 전시용 한복
> 3. 행사날짜 대여한복 리스트

## 타입 디스플레이
```js
const TYPE_TO_KOREAN = (type) => {
    // id -> `${type} 한복`
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
            return '에러'
    }
}
```
```js
    // useEffect()
    const onLoad(() => {
        // 1. redux data에서 해당 상품의 rentals / stock 이 들어가도록 매핑
        rentalMapping()
        // 2. 해당상품이 rentals >= stock 이면 unavail = true
        setUnavailList()
        // 3. 대여가능 여부에 따라 image div 변경    
        setGalleryData()
    },[])
```

## 디테일 디스플레이
해당 상품 id로 axios로 자세한 정보를 불러와서 보여주기
```js
function onLoad() {
    const searchPath = `${SERVER_PATH}/${id}`
    axios.get(searchPath).then((result) => {
        setImageData(result)
    })
}
```
대여 템플릿은 동일하게 사용

