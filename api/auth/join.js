const express = require('express');
const db = require('../../config/db');
const routes = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//TODO: 아이디 유효성 검사(중복확인)
// routes.post("/valid-id", (req,res)=>{
//     let userid = req.body.userid;
//     db.query(`select * from test WHERE userid = "${userid}"`, (err, results)=>{
//         if(results.length == 0 ){
//             res.status(400).send({isvalid:true});
//         }else{
//             res.status(200).send({isvalid:false});
//         }
//     })
// })

//FIXME: passport 를 사용하기
//TODO: 아이디 가입
// routes.post("/", (req,res)=>{
//     //let userName = req.body.userName;
//     let userInfo = req.body;
//     if(userInfo.isvalid){
//         db.query(`insert into test(username,userid,userpw,email) values ("${userInfo.username}","${userInfo.userid}","${userInfo.userpw}","${userInfo.email}")`,(err, results)=>{
//             if(err)throw err;
//             res.status(400).send({state:"success"});
//         });
//     }else{
//         res.status(200).send({state:"fail"});
//     }
// });

routes.post('/', (req,res,next)=>{
    passport.authenticate('local-join',(err,userinfo,msg)=>{
        if(!userinfo){
            res.send(msg);
        }else{
            console.log(`${userinfo.username} 님이 가입되었습니다.`);
            res.send({"msg":"join succeed"});
            req.logIn(userinfo,(err)=>{
                
            })
        }
    })(req,res,next);
})

passport.serializeUser((user,done)=>{
    console.log(`${user.username} session save`);
    done(null, user);
});
passport.deserializeUser((user,done)=>{
    console.log(`${user.username} session get`);
    done(null, user);
});

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
module.exports = routes;