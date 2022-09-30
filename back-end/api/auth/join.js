const express = require('express');
const db = require('../../config/db');
const routes = express.Router();
const passport = require('passport');
const user = require('../../models/user');
// require('../../passport/serialize');
// require('../../passport/passport')(passport);

//TODO: 회원가입
routes.post("/", (req,res)=>{
    //let userName = req.body.userName;
    const userinfo =req.body;
    const {username,userid,userpw,email} = userinfo;
    console.log(username,userid,userpw,email);
    user.findUser(userid)
    .then((result)=>{
        //존재 x 가입진행
        res.status(401).send({msg:"ID that already exists"});
    })
    .catch((result)=>{
        //false 이미 동일한 아이디 존재
        user.ceateUser(userinfo)
        .then((joinSate)=>{
            res.status(200).send(joinSate)
        })
        .catch((joinSate)=>{
            res.status(401).send(joinSate);
        })
    })
});



module.exports = routes;