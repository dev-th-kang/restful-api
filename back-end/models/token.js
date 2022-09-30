const db = require('../config/db');
let sql;
module.exports = {
    /** FIXME: refresh Token 발행도 여기서 진행하면 어떨까 생각중 */
    /** TODO: 발행된 refreshToken 저장 */
    refreshTokenSave:(userid,refreshToken)=>new Promise((resolve,reject)=>{
        sql = `replace INTO saveToken(userid,refreshToken) values("${userid}","${refreshToken}")`
        db.query(sql,(err,result)=>{
            if(err) reject("err");
            resolve("ok");
        })
    }),
    
    /** TODO: 발행된 refreshToken 조회 */
    getRefreshToken:(userid)=>new Promise((resolve,reject)=>{
        sql = `select * from saveToken where userid = "${userid}"`;
        db.query(sql,(err,result)=>{
            if(result.length) resolve(result[0].refreshToken);
            else reject("false");
        })
    })
}