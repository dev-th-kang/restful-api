const routes = require('express').Router();

routes.get('/',(req,res,next)=>{
    if(req.user) res.send({"checkLoginStatus":true})
    else res.send({"checkLoginStatus":false})
})

module.exports = routes;