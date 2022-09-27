const express = require('express');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy
const db = require('../../config/db');
const routes = express.Router();
const cors = require('cors');
require('../../passport/serialize');
require('../../passport/passport')(passport);
//FIXME: 로그인 JWT 포함하고, 토큰넘겨주기 
routes.post('/', function(req, res, next) {
    //passport화해서 묶기
    //passport 로 passport-local 로 로그인 진행 (먼저 passport 미들웨어로 들어감)
    passport.authenticate('local-login', function(err, userinfo, msg) {
        //console.log("11");
		if(err) res.status(500).json(err);
		if (!userinfo) return res.status(401).json({state:"login fail"});

		req.logIn(userinfo, function(err) {
        if (err) { return res.status(401).json({state:"login fail"}); }
        return res.json(userinfo);
    });

	})(req, res, next);
})
<<<<<<< HEAD
// passport 미들웨어 username과 password Field의 이름을 말해준뒤 req값과 id, password값으로 받는다. 

=======
passport.serializeUser((user,done)=>{
    console.log(`${user.username} session save`);
    done(null, user);
});
passport.deserializeUser((user,done)=>{
    console.log(`${user.username} session get`);
    done(null, user);
});

// passport 미들웨어 username과 password Field의 이름을 말해준뒤 req값과 id, password값으로 받는다. 
passport.use('local-login', new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'userpw',
    passReqToCallback : true
}, function(req, userid, userpw, done) {
    //console.log(id);
    //console.log(password);
    //db로 체크 회원인지 아닌지
    
    db.query(`select * from test where userid ='${userid}' && userpw = '${userpw}'`, (err,rows)=>{
        if(err) return done(err);
        const info ={   username :rows[0].username,
                        email:rows[0].email };
        //console.log(info)
        if(rows.length) 
            return done(null, {
                "username":info.username,
                "userid":userid,
                "userpw":userpw,
                "email":info.email
            });
        else return done(null, false, {'message' : 'Incorrect id or password'})
    })
}
));
>>>>>>> a590e39e7ac2cdd98efad13ea912dee80cdcd099

module.exports = routes;