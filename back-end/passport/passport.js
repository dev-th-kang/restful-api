const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/db');
module.exports = (passport)=>{
    passport.use('local-login', new LocalStrategy({
        usernameField: 'userid',
        passwordField: 'userpw',
        passReqToCallback : true
    }, function(req, userid, userpw, done) {
        //console.log(id);
        //console.log(password);
        //db로 체크 회원인지 아닌지
        
        db.query(`select * from test where userid ='${userid}' && userpw = '${userpw}'`, (err,rows)=>{
            //console.log(info)
            if(rows.length) {
                const info ={   username :rows[0].username, email:rows[0].email };
                return done(null, {
                    "username":info.username,
                    "userid":userid,
                    "userpw":userpw,
                    "email":info.email
                });
            }
            else return done(null, false, {'message' : 'Incorrect id or password'})
        })
    }
    ));

    passport.use('local-join',new LocalStrategy({
        usernameField:"userid",
        passwordField:"userpw",
        passReqToCallback:true
    },(req,userid,userpw,done)=>{
        const {username,email} = req.body;
        db.query(`select * from test where userid="${userid}"`,(err,rows)=>{
            if(!rows.length){
                db.query(`insert into test values("${username}","${userid}","${userpw}","${email}")`,(err,results)=>{
                    if(results.affectedRows){
                        return done(null, {
                            "username":username,
                            "userid":userid,
                            "userpw":userpw,
                            "email":email
                        });
                    }else{
                        return done(null, false,{"msg":"registration was not processed properly"});
                    }
                })
            }else{
                return done(null, false, {"msg":"ID already exists"});
            }
        })
        //valid - userid
    }))
}