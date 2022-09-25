const express = require('express');
const passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy
const db = require('../../config/db');
const routes = express.Router();
const cors = require('cors');

//FIXME: 로그인 JWT 포함하고, 토큰넘겨주기 
routes.post('/', function(req, res, next) {
    //passport화해서 묶기
    //passport 로 passport-local 로 로그인 진행 (먼저 passport 미들웨어로 들어감)
    passport.authenticate('local-login', function(err, user, info) {
		if(err) res.status(500).json(err);
		if (!user) return res.status(401).json({state:"login fail"});

		req.logIn(user, function(err) {
        if (err) { return res.status(401).json({state:"login fail"}); }
        return res.json(user);
    });

	})(req, res, next);
})
passport.serializeUser(function(user, done) {
	console.log('passport session save : ', user.username);
    done(null, user.username)
});

passport.deserializeUser(function(username, done) {
	console.log('passport session get id: ', username)
	done(null, id);
})

// passport 미들웨어 username과 password Field의 이름을 말해준뒤 req값과 id, password값으로 받는다. 
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
}, function(req, id, password, done) {
    console.log(id);
    console.log(password);
    //db로 체크 회원인지 아닌지
    db.query(`select * from test where userid ='${id}' && userpw = '${password}'`, (err,rows)=>{
        if(err) return done(err);
        if(rows.length) {
            return done(null, {'username' : id, 'password':password})
        } else {
            return done(null, false, {'message' : 'Incorrect id or password'})
        }
    })
}
));

module.exports = routes;