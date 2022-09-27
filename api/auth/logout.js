const express = require('express');
const routes = express.Router();

//FIXME: passport로 로그아웃 진행
routes.post('/',(req,res,next)=>{
    req.logout((err)=>{
        if(err) {return next(err)}
        res.send('<alert>logout succeed</alert>')
    })
})
module.exports = routes;