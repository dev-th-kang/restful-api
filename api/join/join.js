
const express = require('express');
const db = require('../../config/db');
const routes = express.Router();
routes.post("/", (req,res)=>{
    //let userName = req.body.userName;
    let userInfo = req.body;
    console.log(userInfo.id);
    db.query(`select * from test WHERE userid = "${userInfo.id}"`, (err, results)=>{
        if(err)throw err;
        if(results.length == 0 ) res.send({state:"사용 가능한 아이디입니다."});
        else res.send({state:"이미 사용중인 아이디입니다."});
    });
})

module.exports = routes;