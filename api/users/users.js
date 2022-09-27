const routes = require('express').Router();

routes.get('/',(req,res,next)=>{
    // 로그인 상태확인
    console.log(req.user)
    if(req.user) {
        console.log(`${req.user.username} 님이 로그인상태 요청`)
        res.send({"checkLoginStatus":true})
    }
    else res.send({"checkLoginStatus":false})
})

module.exports = routes;