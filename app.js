const express = require('express');
const bodyParser = require("body-parser")
const routes = require('./api');
const app = express();


//아래의 내용을 안넣으면 body 값을 요청할때
//undefined라고 나옴. 
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 

app.use('/api',routes);

app.listen(3000);