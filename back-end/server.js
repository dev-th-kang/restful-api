const express = require('express');
const bodyParser = require("body-parser")
const routes = require('./api');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors')
const db = require('./config/db');
const app = express();
//require('dotenv').config();
//아래의 내용을 안넣으면 body 값을 요청할때
//undefined라고 나옴. 
db.connect();

app.use(cors());


app.use(passport.initialize());

app.use(flash());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 

app.use('/api',routes);

app.listen(3000,()=>{
    console.log(`http://localhost:3000 server running..`);
});