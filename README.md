비단본가 한복갤러리
=========
Create React App으로 시작한 프로젝트이며, 현재 개발·빌드는 Vite를 사용합니다.

## 실행과 검증

Node.js 20.19+ 또는 22.12+가 필요합니다. 현재 작업은 Node.js 24에서 검증했습니다.
PowerShell에서 npm 실행 정책 오류가 나면 `npm` 대신 `npm.cmd`를 사용합니다.

```sh
npm ci
npm start
```

개발 주소는 `http://localhost:5173`입니다. 터미널의 `Ctrl+C`로 종료합니다.

| 명령 | 역할 |
| --- | --- |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run lint` | 코드 규칙 검사 (기존 정리 항목은 경고로 표시) |
| `npm test` | Jest 테스트 한 번 실행 |
| `npm run test:watch` | 파일 변경에 맞춰 테스트 재실행 |
| `npm run check` | 타입 검사 → 코드 검사 → 테스트 |
| `npm run build` | 전체 검사 성공 후 `build/`에 배포 파일 생성 |
| `npm run preview` | 생성된 `build/`를 `http://localhost:5174`에서 확인 |

`dev:vite`, `build:vite`, `preview:vite`는 이전 단계에서 사용하던 명령의 별칭입니다.
Jest는 Vite 플러그인을 사용하지 않고 `jest.config.cjs`의 별도 변환 설정으로 실행합니다.
실제 브라우저 동작은 빌드 후 미리보기에서도 확인합니다.

## 배포

Cloudflare Workers의 빌드 명령은 `npm run build`, 배포 명령은 `npx wrangler deploy`입니다.
`wrangler.jsonc`가 `build/`를 배포하고 SPA 주소의 직접 접속을 처리합니다.
운영 브랜치는 Cloudflare 대시보드에서 관리합니다.

루트 `index.html`이 앱의 시작점이고, `public/`에는 이미지·폰트 등 원본 정적 파일을 둡니다.
`build/`는 매번 생성하므로 Git에서 제외합니다. 원본 `public/` 파일은 Git으로 관리합니다.
과거 `build-vite/` 결과물은 더 이상 사용하지 않습니다.

아래는 기존 화면 구성에 관한 초기 메모입니다. 대여 판정 등 현재 동작은 실제 코드를 기준으로 확인합니다.

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
function onLoad() {
    // 1. redux data에서 해당 상품의 rentals / stock 이 들어가도록 매핑
    rentalMapping()
    // 2. 해당상품이 rentals >= stock 이면 unavail = true
    setUnavailList()
    // 3. 대여가능 여부에 따라 image div 변경    
    setGalleryData()
}
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

