const express = require('express');
<<<<<<< HEAD
const routes = express.Router();

//FIXME: passport로 로그아웃 진행
routes.post('/',(req,res,next)=>{
    req.logout((err)=>{
        if(err) {return next(err)}
        res.send('<alert>logout succeed</alert>')
    })
=======
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
>>>>>>> feature/crud_board
})
module.exports = routes;