# Back-end


* ### use stack

    <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">

* ### api
    |url|Method|Req|
    |:---|:---|:---|
    |[/auth/api/join](./back-end/api/auth/join.js)|POST|{msg or sate, userinfo:{null or username, userid, userpw, email}}|
    |[/auth/api/login](./back-end/api/auth/login.js)|POST|{token,msg}
    |[/users](./back-end/api/users/users.js)|GET|{tokenIssurance, loginState, msg, token}

<br><br>

* ### 구현 내용
  * passport-jwt 사용
    * refresh token 기술 사용
    * refresh token 발행, 조회되는 부분 model 개발
  * mysql 사용
    * db 접근이 많이 일어나는 부분 model 개발
  * dotenv로 보안성을 요하는 정보들 분리
  * join 시 DB에 비밀번호 bcrypt 모듈로 암호화 진행 후 올림
#

* ### 구현 예정
  * CRUD 게시판
  * token 블랙리스트
  * db 접근이 많을 때 최적화 방법 고안
<br><br><br><br>
<br><br>

# Front-end
* ### use stack
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

