const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const token = require('../../models/token');
const user = require('../../models/user');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
require('dotenv').config()
const TOKEN_SECRET = toString(process.env.secret);
const TOKEN_TYPE = toString(process.env.token_type);
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = TOKEN_SECRET;
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
function verifyToken(tokenValue, secret){
    try{
        return jwt.verify(tokenValue,secret)
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
            if(verifyToken(tokenValue,"secret")=="jwt expired"){
                //refreshToken 으로 accessToken 재발행 절차 실행
                const decodeToken = jwt.decode(tokenValue,TOKEN_SECRET);
                token.getRefreshToken(decodeToken.userid)
                .then((refreshToken)=>{
                    //refresh token이 존재할떄
                    console.log(refreshToken);
                    if(verifyToken(refreshToken,"secret") == "jwt expired"){
                        res.status(401).send({
                            tokenIssurance: false,
                            loginState: false,
                            msg:"다시 로그인이 필요합니다.3"
                        })
                        return;
                    }else{
                        //토큰발행
                        const newToken = jwt.sign({username:decodeToken.username,userid:decodeToken.userid},TOKEN_SECRET,{expiresIn:'10s'});
                        req.headers["authorization"] = "Bearer " + newToken
                        res.status(200).send({
                            tokenIssurance: true,
                            token:TOKEN_TYPE+" "+ newToken,
                            msg:"succeed get newToken"
                        })
                    }

                })
            }else{
                // 로그인 완료;
                res.status(200).send({
                    tokenIssurance: true,
                    loginState: true,
                    msg:`${user}님이 로그인에 성공하였습니다.`
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
passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    console.log(jwt_payload)
    user.findUser(jwt_payload.userid)
    .then((value)=>{
        return done(null,jwt_payload.userid)
    })
    .catch((value)=>{
        return done(null,false)
    })
}));


module.exports = routes;