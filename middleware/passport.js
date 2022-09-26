const passport  = require('passport');
var LocalStrategy = require('passport-local').Strategy
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
}, function(req, id, password, done) {
    //console.log(id);
    //console.log(password);
    //db로 체크 회원인지 아닌지
    db.query(`select * from test where userid ='${id}' && userpw = '${password}'`, (err,rows)=>{
        if(err) return done(err);
        if(rows.length) return done(null, {'username' : id, 'password':password})
        else return done(null, false, {'message' : 'Incorrect id or password'})
    })
}
));
module.exports = passport;