const express = require('express');
const bodyParser = require("body-parser")
const routes = require('./api');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors')
const db = require('./config/db');
const app = express();

app.use(cors());
//아래의 내용을 안넣으면 body 값을 요청할때
//undefined라고 나옴. 
db.connect((err)=>{  
    if(!err) console.log("Good!");
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 

app.use('/api',routes);

app.listen(3000);