const express = require('express');
const user = require('../../config/user');
const token = require('../../config/token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routes = express.Router();
require('dotenv').config()
const SECRET = process.env.secret;
const TOKEN_TYPE = process.env.token_type;
// require('../../passport/serialize');
// require('../../passport/passport')(passport);
//FIXME: 로그인 JWT 포함하고, 토큰넘겨주기 
routes.post('/', (req,res)=>{
    const {userid,userpw} = req.body;
    user.findUser(userid)
    .then((value)=>{
        //인증성공
        //토큰 발생
        bcrypt.compare(userpw,value.userpw,(err,same)=>{
            if(same){
                //비밀번호가 맞음
                const payload = {
                    "username":value.username,
                    "userid":value.userid
                }
                const accessToken = jwt.sign(payload,SECRET,{expiresIn:"10s"});
                const refreshToken = jwt.sign(payload,SECRET,{expiresIn:"1h"});
                token.refreshTokenSave(userid,refreshToken)
                .then(console.log)
                .catch(console.log)

                res.status(200).send({
                    "token":TOKEN_TYPE+" "+accessToken,
                    "msg": "succeed get Token"
                })
            }else{
                //비번 비일치
                res.status(401).send({
                    "msg":"password incorrect"
                })

            }
        })

    })
    .catch((value)=>{
        console.log(value);
        //아이디 비일치 존재x
                res.status(401).send({
                    "msg":"id incorrect"
                })
    })
})


module.exports = routes;