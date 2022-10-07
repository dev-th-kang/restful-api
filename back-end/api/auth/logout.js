const express = require('express');
const jwt = require('jsonwebtoken');
const token = require('../../config/token');
const routes = express.Router();
require('dotenv').config();
SECRET = process.env.secret
//FIXME: passport로 로그아웃 진행
//토큰 만료 진행?
routes.post('/',(req,res,next)=>{
    const accessToken = req.headers['authorization'];
    const [tokenType,tokenValue] = accessToken.split(' ')
    const decodeToken = jwt.decode(tokenValue,SECRET)
    console.log("등장")
    token.revokeRefreshToken(decodeToken.userid)
    .then((value)=>{
        res.send({msg:"삭제성공!"});
        return;
    })
    .catch((value)=>{
        res.send({msg:"삭제실패"});
        return;

    })
    //token.revokeRefreshToken()
})
module.exports = routes;