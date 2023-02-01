# Redux 댓글 CRUD
원티드 프리온보딩 인턴십에서 4주차 과제로 API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현했습니다.

## 목차
- [요구 사항](#1)
- [구현 내용](#2)
- [회고](#3)
- [기술 스택](#4)
- [실행 방법](#5)

## 요구 사항
* 구현 사항 
    - 댓글 불러오기, 작성, 수정, 삭제가 동작하도록 기능 구현
    - 페이지네이션
    - 댓글 작성, 수정, 삭제 후 동작
        - 댓글 작성하고 난 뒤: 다른 페이지에 위치하고 있었더라도 1페이지로 이동, 입력 폼 초기화
        - 댓글 수정하고 난 뒤: 현재 보고있는 페이지 유지, 입력 폼 초기화
        - 삭제하고 난 뒤: 1페이지로 이동

* 구현 조건
    - Redux 환경설정은 자유롭게 진행
        - Redux-saga or Redux-thunk 자유롭게 선택 가능
        - 미들웨어 사용안하는 것도 가능
    - Redux logger, Redux-Devtools 설정 필수
    - Redux를 이용한 비동기 처리 필수

* 개발 조건 및 환경 
    - 언어 : JavaScript / TypeScript
    - 필수 기술: React, Redux, Redux-Logger, Redux-Devtools
    - 선택 기술:
        - Redux 관련 라이브러리(Toolkit, middleware 등)
        - 스타일 관련 라이브러리(styled-components, emotion, UI kit 등)
        - HTTP Client(axios 등)
    - 위에 기재된 라이브러리 외 사용 불가



## 구현 내용  <a id="2"></a>
- redux-toolkit에 내장되어 있는 thunk api를 사용하여 redux에서 비동기 처리를 할 수 있도록 구현했습니다. 

- axios를 감싼 HttpClient 클래스를 생성하고, HttpClient를 주입받아 통신 기능을 추상화한 repository 클래스를 생성했습니다. action의 payload로 repository를 같이 받아 redux에서는 네트워크를 사용하는 지, 디비를 사용하는지 모를 수 있도록 의존성을 분리했습니다. 

https://github.com/hyejineee/redux-comment/blob/22b7b472ef6c93c1487cbfeb4582d826f0e9a340/src/commons/redux/commentReducer.ts#L50-L62

https://github.com/hyejineee/redux-comment/blob/22b7b472ef6c93c1487cbfeb4582d826f0e9a340/src/commons/types/module.types.ts#L10-L17

![](./gif/search.gif)
<br/>

## 회고 <a id="3"></a>
### 1. 의도한 결과는 무엇이었는가? (초기 목표)
- 안드로이드에서 주로 사용했던 repository 패턴을 프로젝트에 적용하는데 집중하여 구현했습니다. 
### 2. 실제 어떤 일들이 일어났는가? (현실)
- redux 상태관리 라이브러리와 repository 패턴을 접목시키는데 어려움이 있었습니다. redux의 reducer는 순수 함수이고 repository는 클래스 형태이기 때문에 어떻게 reducer에서 repository를 사용할 수 있을까? 하는게 제일 큰 고민이었습니다. 이 문제를 해결하기 위해 기존에 의존성 주입을 어떻게 했는가?를 다시 생각해 보게 되었고, 기존에 했던 방법도 생성자 메소드라는 함수를 통해서 주입한다는 사실을 깨닫고 thunk action에 payload로 repository를 전달하는 방법으로 문제를 해결했습니다.

### 3. 지속, 개선 혹은 포기할 것들은 무엇인가? 배운 것들은 무엇인가? (목적)
- 기존에 안드로이드에서 객체 지향을 하면서 틀에 박혔던 사고를 깨는 시간이 되었습니다. 클래스인가 함수인가가 중요한 것이 아니라 기존에 동작했던 것들이 어떤 방식으로 돌아갔는지 파악하는 것이 중요하다는 것을 깨닫는 시간이 되었습니다.

<br/>

## 기술 스택 <a id="4"></a>

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" > <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white" > <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white" > <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white" > 

## 실행방법 <a id="5"></a>

1. 프로젝트를 클론합니다.
```
git clone https://github.com/hyejineee/redux-comment.git
```
2. 클론한 프로젝트 내부로 이동합니다. 
```
cd redux-comment
```
3. 의존 패키지를 설치합니다. 
```
yarn
```
4. 다음 명령어를 사용하여 서버를 실행합니다.
```
# api 서버 실행 
yarn api

# 클라이언트 실행
yarn dev 
```


