const db = require('./db')
function updateIdx(){
/*
alter table board auto_increment=1;set @count =0;update board set idx = @count:=@count+1;
*/

    const sql1 =`alter table board auto_increment=1;`
    const sql2 =`set @count =0;`
    const sql3 =`update board set idx = @count:=@count+1;1
    `
    db.query(sql1+sql2+sql3,(err,results)=>console.log("recounting good"))
    return;
}
let sql;
module.exports = {
    createPost:(data)=> new Promise((resolve,reject)=>{
        sql = `insert into board(userid,username,title,contents) values("${data[0]}","${data[1]}","${data[2]}","${data[3]}")` 
        console.log(sql)
        db.query(sql,(err,results)=>{
            if(err) reject(false)
            if(results.affectedRows){                
                updateIdx();
                resolve(true)
            }
            else{
                reject(false)
            }

        })
    }),
    deletePost:(idx,userid)=> new Promise((resolve,reject)=>{
        sql = `delete from board where idx = ${idx} && userid = "${userid}"`
        console.log(sql)
        db.query(sql,(err,results)=>{
            if(err)reject(false);
            if(results.affectedRows){
                updateIdx();
                resolve(true);
            }else{
                reject(false);
            }
        })
    }),
    updatePost:(idx,userid, chgcontent)=> new Promise((resolve,reject)=>{
        
        sql = `update board set title="${chgcontent.title}", contents = "${chgcontent.contents}" where idx = ${idx} and userid="${userid}"`
        console.log(sql)
        db.query(sql,(err, results)=>{
            if(err) {
                reject(false);
            }
            if(results.affectedRows){
                resolve(true);
            }else{
                reject(false);
            }
        })

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
    readPosts:()=> new Promise((resolve,reject)=>{
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