const passport = require('passport');
const user = require('../config/user');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
require('dotenv').config()
const SECRET = process.env.secret;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
    user.findUser(jwt_payload.userid)
    .then((value)=>{
        return done(null,{username:value.username, userid:value.userid})
    })
    .catch((value)=>{
        return done(null,false)
    })
}));