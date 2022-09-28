const express = require('express');
const passport  = require('passport');
const LocalStrategy = require('passport-local').Strategy
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
// passport 미들웨어 username과 password Field의 이름을 말해준뒤 req값과 id, password값으로 받는다. 


module.exports = routes;