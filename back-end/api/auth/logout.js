const express = require('express');
const jwt = require('jsonwebtoken');
const token = require('../../models/token');
const routes = express.Router();
require('dotenv').config();
SECRET = process.env.secret
//FIXME: passport로 로그아웃 진행
//토큰 만료 진행?
routes.post('/',(req,res,next)=>{
    const accessToken = req.headers['authorization'];
    const [tokenType,tokenValue] = accessToken.split(' ')
    const decodeToken = jwt.decode(tokenValue,SECRET)
    token.revokeRefreshToken(decodeToken.userid)
    .then((value)=>{
        res.send("삭제성공!");
    })
    .catch((value)=>{
        res.send("삭제실패");

    })
    //token.revokeRefreshToken()
})
module.exports = routes;