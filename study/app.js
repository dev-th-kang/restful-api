const express = require('express');
const app =express();
var jwt = require('jsonwebtoken')

app.get('/',(req,res)=>{
    var token = jwt.sign({
        test: "test"
    },
    "secretKey",
    {
        subject: "jj!!",
        expiresIn: '60m',
        issuer: "panyeon"
    })
    console.log(token)
});

//create listen status
app.listen(3000,()=>{
    console.log("127.0.0.1:3000 start");
}) ;