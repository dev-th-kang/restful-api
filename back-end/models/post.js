const db = require('../config/db')

let sql;
module.exports = {
    createPost:(data)=> new Promise((resolve,reject)=>{
        sql = `insert into board(userid,username,title,contents) values("${data[0]}","${data[1]}","${data[2]}","${data[3]}")` 
        db.query(sql,(err,results)=>{
            if(results.affectedRows)
                resolve(true)
            else{
                reject(false)
            }

        })
    }),
    deletePost:()=> new Promise((resolve,reject)=>{
        sql = ``
    }),
    updatePost:()=> new Promise((resolve,reject)=>{
        sql = ``
    }),
    readPost:(idx)=> new Promise((resolve,reject)=>{
        
        sql = `select * from board where idx = ${idx}`
        db.query(sql,(err,rows)=>{
            if(rows.length){
                resolve(rows[0])
            }else{
                reject(false)
            }
        })
    }),
    allPosts:()=> new Promise((resolve,reject)=>{
        sql = `select * from board `
        db.query(sql,(err,results)=>{
            if(results.length){
                resolve(results)
            }else{
                reject(false);
            }
        })
    })

}