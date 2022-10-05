const db = require('../config/db')

let sql;
module.exports = {
    createPost:()=> new Promise((resolve,reject)=>{
        sql = `` 
    }),
    deletePost:()=> new Promise((resolve,reject)=>{
        sql = ``
    }),
    updatePost:()=> new Promise((resolve,reject)=>{
        sql = ``
    }),
    readPost:(user)=> new Promise((resolve,reject)=>{
        sql = `select * from board where username`
    }),
    allPosts:(user)=> new Promise((resolve,reject)=>{
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