const express = require('express');
const routes = express.Router();

routes.post("/", (req,res)=>{
    //let userName = req.body.userName;
    console.log(req.body)
})

module.exports = routes;