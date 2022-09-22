# express install
```
npm install express --save 
npm install jsonwebtoken --save
```

* 2022-09-20
    * express 설치 및 서버 실행 테스트


* 1차 예정 사항
  * 데이터베이스 pool 구현(use mysql)
  * 회원가입 api 구현
  * rest규정에 맞춰서 정리
  * 위의 구성과정 이후 passport 사용

* DB 오류 발생시, 비밀번호를 변경해줘야한다. 아래 구문 이용 
    
    ```
     ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; 
    ```

* 2022-09-23
    * DB pool 대충 구현
    * postman으로 값전송시 가입가능한 id 인지 판별하는걸로 query 작동여부 판단.
    * dotEnv로 DB정보 가리기