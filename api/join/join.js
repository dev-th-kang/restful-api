
const express = require('express');
const db = require('../../config/db');
const routes = express.Router();

//TODO: 아이디 유효성 검사(중복확인)
routes.post("/valid-id", (req,res)=>{
    let userid = req.body.userid;
    db.query(`select * from test WHERE userid = "${userid}"`, (err, results)=>{
        if(results.length == 0 ){
            res.send({isvalid:true});
        }else{
            res.send({isvalid:false});
        }
    })
})

//FIXME: passport 를 사용하기
//TODO: 아이디 가입
routes.post("/", (req,res)=>{
    //let userName = req.body.userName;
    let userInfo = req.body;
    if(userInfo.isvalid){
        db.query(`insert into test(username,userid,userpw,email) values ("${userInfo.username}","${userInfo.userid}","${userInfo.userpw}","${userInfo.email}")`,(err, results)=>{
            if(err)throw err;
            res.send({state:"success"});
        });
    }else{
        res.send({state:"fail"});
    }
})

module.exports = routes;