const routes = require('express').Router();
const post = require('../../models/post')
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
require('dotenv').config()
const SECRET = process.env.secret;
const TOKEN_TYPE = process.env.token_type;
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;


//FIXME: middleware로 token이 있다면, 글쓰기 가능

/** TODO: 게시물 게시 */
routes.post('/',(req,res,next)=>{
    const accessToken = req.headers["authorization"];
    const [tokenType,tokenValue] = accessToken.split(' ')
    if(tokenType !=TOKEN_TYPE){
        res.send({"msg":"login을 해주세요"})
        return;
    }
    try{
        jwt.verify(tokenValue,SECRET);
        const decodeToken = jwt.decode(tokenValue,SECRET);
        
        const title = req.body.title;
        const content = req.body.content;
        data = [decodeToken.userid,decodeToken.username,title,content];
        post.createPost(data)
        .then((result)=>{
            res.send({"msg":"good"})
            return;
        })
        .catch()
    }catch(err){
        res.send({"msg":"login을 해주세요"})
    }

})
/** TODO:  게시물 전체 조회 */
routes.get('/',(req,res)=>{
    console.log(req.query.idx)
    if(req.query.idx == null){
        post.allPosts()
        .then((values)=>{
            res.status(200).send(values)
        })
        .catch(()=>{
            console.log('err')
        })
    }else{
        console.log("YES")
        post.readPost(req.query.idx)
        .then((value)=>{
            res.send(value)
        })
    }
})
/** TODO: 게시물 수정 */
routes.put('/',(req,res)=>{

})
/** TODO: 게시물 삭제 */
routes.delete('/',(req,res)=>{

})
// passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
//     console.log(jwt_payload)
//     user.findUser(jwt_payload.userid)
//     .then((value)=>{
//         return done(null,{username:value.username, userid:value.userid})
//     })
//     .catch((value)=>{
//         return done(null,false)
//     })
// }));


module.exports = routes;