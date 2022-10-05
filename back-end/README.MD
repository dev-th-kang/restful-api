# express install
```
npm install express --save 
npm install jsonwebtoken --save
```

* 2022-09-20
    * express 설치 및 서버 실행 테스트


## 1차 예정 사항 (clear)
#
  * 데이터베이스 connection 구현(use mysql)
  * 회원가입 api 구현
  * rest규정에 맞춰서 정리
  * 위의 구성과정 이후 passport 사용
<br><br>
### 세부진행
#

* DB 오류 발생시, 비밀번호를 변경해줘야한다. 아래 구문 이용 
    
    ```
     ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; 
    ```

* 2022-09-23
    * DB connection 대충 구현
    * postman으로 값전송시 가입가능한 id 인지 판별하는걸로 query 작동여부 판단.
    * dotEnv로 DB정보 가리기

* 2022-09-25
    * 미들웨어에 대한 개념 부족
    * 프로미스, 콜백 함수에 대한 개념 부족
    * 동기 비동기, 기초문법 개념 부족
    * 추가적인 공부이후 다시 passport 공부 도전할 것
    * 목표 약간 수정 passport-local로 먼저 한다음에 passport-jwt를 이용해서 토큰인증방식으로 변경
    * 모든게 다 끝나면, typescript 도 사용하고, 프론트엔드 연결시켜보기
    * axio 공부하기

* 2022-09-30
    * 프로미스함수로, DB에서 User에 대한 조회, 삽입, 수정 요청 제어 및 Token과 refresh 토큰에 대한 제어 기능 추가
    * 동기 비동기에 대한 차이 구분 완료
      * 비동기는 일을 다 끝나고 진행 해야함(이때 Promise 를 사용)
      * 동기는 동시에 사용되는것
    * passport-jwt 에서 accessToken 방식은 보안성이 저하되므로, main RefreshToken을 만들고 DB에 저장해서 accessToken 만료시간을 20초로 잡고 이후,만료때 마다 DB 요청으로 accessToken 재발행(속도적인 측면 이 약간 걱정됨.) DP 형태로 진행하면 어떨까봄. refreshToken 값을 json 화해서 server에 두고, 만약 json 화된 파일안에 refresh 토큰이 아직 만료되지않으면, 그냥 바로 진행해버리고, 만료되면 db에서 확인해서 만료되지않은 refresh 토큰이 있는지 확인
    * 현재 logout이 jwt 특성상 매끄럽게 진행되지않음. **토큰 블랙리스트** 기법을 참조해볼 예정(클라이언트에서 logout시 토큰을 날려도되지만, 서버에서 진행하는게 더 좋을거같음. 시도해보려고함)
    * bcrypt 방식으로 DB에 넣을때 비밀번호 암호화 진행.
    * token 관련정보 .env 를 통해서 보안성 강화
    * 현재 속도 측면과, refreshToken이 정말 안전한지 확인해야할것 같음
  
  > 인증 api가 거의 완성되었으므로, CRUD api 개발진행하기

<br><br>
## 2차 예정사항
#
* login 형태 최적화
* res.send 형태 정형화 시키기, 세부정보, 필요한 정보 추려서 넘기기
* CRUD 게시판 api 추가 개발
  * 게시판에 대한 권한
    * 글쓰기 권한
    * 읽기 권한
* refresh Token 보안성 검사
* jwt 를 쓰면서 로그아웃을 하는 방식 고안
  * 현재 refresh 토큰은 서버에서 날리고, 클라이언트에서 accessToken을 날림. 블랙리스트관련 기능 공부중 