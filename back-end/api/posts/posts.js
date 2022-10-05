const routes = require('express').Router();
const post = require('../../models/post')

/** TODO: 게시물 게시 */
routes.post('/',(req,res)=>{

})
/** TODO:  게시물 전체 조회 */
routes.get('/',(req,res)=>{
    post.allPosts()
    .then((values)=>{
        res.status(200).send(values)
    })
    .catch()
})
/** TODO: 게시물 수정 */
routes.put('/',(req,res)=>{

})
/** TODO: 게시물 삭제 */
routes.delete('/',(req,res)=>{

})



module.exports = routes;