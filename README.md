# 📋 파일 기반 게시판 프로젝트

이 프로젝트는 파일 시스템을 기반으로 게시글을 저장하고 불러오는 **간단한 게시판 시스템**입니다. 프론트엔드는 HTML/CSS/JavaScript로 구성되어 있으며, 게시글 데이터는 서버 측에서 Node.js를 통해 파일로 읽고 쓰는 구조입니다.

---

## 📁 프로젝트 구조

게시판/
├── main.js # 게시판의 핵심 JavaScript 로직
├── style.css # 게시판의 UI 스타일
├── data/ # 각 게시글이 개별 파일로 저장됨
│ ├── 423424
│ ├── adfsadf
│ ├── CSS
│ ├── f
│ ├── fdf
│ ├── gsf
│ ├── hello
│ ├── HTML
│ ├── JavaScript
│ ├── sf
│ ├── two trhee
│ ├── w4tseg
│ └── ㅇㅇ
└── nodejs/
├── fileread.js # 특정 게시글 파일을 읽는 기능
├── readdir.js # 게시글 목록(파일 목록)을 불러오는 기능
└── sample.txt # 예제 텍스트 데이터


> 참고: `index.html` 파일과 `syntax/` 디렉토리는 현재 프로젝트에서 사용되지 않습니다.

---

## 🛠️ 사용 기술

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js (파일 시스템 기반)
- **저장 방식**: 각 게시글은 `data/` 폴더에 하나의 파일로 저장됨

---

## 🧪 실행 방법

1. Node.js 설치
2. `node nodejs/readdir.js` : 게시글 목록 불러오기
3. `node nodejs/fileread.js` : 특정 게시글 보기

> 필요한 경우 `main.js`에서 서버와 연동되도록 fetch 또는 ajax 방식으로 Node.js 스크립트를 연결해야 합니다.

---

## 📌 향후 개선 아이디어

- 게시글 작성/수정 기능 추가
- 파일명 → JSON 기반 구조로 전환
- Express 기반 API 서버 구성
- 클라이언트 측 UI 개선 및 React 등 프레임워크 도입
