const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const token = require('../../config/token');
require('dotenv').config()
const SECRET = process.env.secret;
const TOKEN_TYPE = process.env.token_type;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
// routes.get('/',(req,res,next)=>{
//     // 로그인 상태확인
//     console.log(req.user)
//     if(req.user) {
//         console.log(`${req.user.username} 님이 로그인상태 요청`)
//         res.send({"checkLoginStatus":true})
//     }
//     else res.send({"checkLoginStatus":false})
// })
function verifyToken(tokenValue){
    try{
        return jwt.verify(tokenValue,SECRET)
    }catch(error){
        return error.message;
    }
}
routes.get('/',(req,res,next)=>{
    passport.authenticate("jwt",{session:false},(err,user)=>{
        accessToken = req.headers["authorization"];
        if(accessToken == null) {
            res.status(401).send({
                tokenIssurance: false,
                loginState: false,
                msg:"다시 로그인이 필요합니다.1"
            })
            return;
        }
        const [tokenType,tokenValue] = accessToken.split(' ')

        if(tokenType != TOKEN_TYPE) {
            res.status(401).send({
                tokenIssurance: false,
                loginState: false,
                msg:"다시 로그인이 필요합니다.2"
            })
            return;
        }
        try{
            if(verifyToken(tokenValue)=="jwt expired"){
                //refreshToken 으로 accessToken 재발행 절차 실행
                const decodeToken = jwt.decode(tokenValue,SECRET);
                console.log(decodeToken)
                token.getRefreshToken(decodeToken.userid)
                .then((refreshToken)=>{
                    //refresh token이 존재할떄
                    console.log(refreshToken);
                    if(verifyToken(refreshToken,SECRET) == "jwt expired"){
                        res.status(401).send({
                            tokenIssurance: false,
                            loginState: false,
                            msg:"다시 로그인이 필요합니다.3"
                        })
                        return;
                    }else{
                        //토큰발행
                        const newToken = jwt.sign({username:decodeToken.username,userid:decodeToken.userid},SECRET,{expiresIn:'10m'});
                        req.headers["authorization"] = "Bearer " + newToken
                        res.status(200).send({
                            tokenIssurance: false,
                            newTokenIssurance:true,
                            token:TOKEN_TYPE+" "+ newToken,
                            msg:"succeed get newToken"
                        })
                    }

                })
                .catch(()=>{
                    res.status(401).send({
                        tokenIssurance: false,
                        loginState: false,
                        msg:"다시 로그인이 필요합니다.3"
                    })
                })
            }else{ 
                // 오류 발생/ 유효하는 키인지
                jwt.verify(tokenValue,SECRET);
                // 로그인 완료;
                res.status(200).send({
                    tokenIssurance: true,
                    loginState: true,
                    info:user,
                    msg:`${user.userid}님이 인증에 성공하였습니다.`
                })
            }
        }catch(err){
            console.log(err.message)
            res.status(401).send({
                tokenIssurance: false,
                loginState: false,
                msg:"다시 로그인이 필요합니다."
            })
        }
        
    })(req,res,next);
})


module.exports = routes;