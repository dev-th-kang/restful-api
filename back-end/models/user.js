const db = require('../config/db');
const bcrypt = require('bcrypt');
require('dotenv').config()
let sql;
const salt = parseInt(process.env.salt);
module.exports = {

    /** TODO: 사용자 조회 진행 */
    findUser:(userid) => new Promise((resolve,reject)=>{
        sql = `select * from test where userid="${userid}"`;
        console.log(sql);
        db.query(sql,(err,rows)=>{
        //console.log(rows);
            if(rows.length){
                resolve(rows[0]);
            }else{
                reject(false);
            }
        })
        
    }),

    //bcrypt
    /** TODO: 사용자 가입 절차 진행 */
    ceateUser:(user)=> new Promise((resolve,reject)=>{
        const {username,userid, userpw,email} = user;
        console.log(userpw,salt)
        //암호화
        const hash =bcrypt.hashSync(userpw,salt);
        sql = `insert into test values("${username}","${userid}","${hash}","${email}")`;
        db.query(sql,(err,results)=>{
            if(results.affectedRows){
                resolve({
                    sate:true,
                    userinfo:{"username":username,
                    "userid":userid,
                    "userpw":hash,
                    "email":email}
                })
            }else{
                reject({
                    sate:false,
                    userinfo:null
                })
            }
        })
    })
}