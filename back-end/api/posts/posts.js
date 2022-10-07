const routes = require('express').Router();
const post = require('../../config/post')
const jwt = require('jsonwebtoken');
const passport = require('passport');
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
routes.post('/',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    const [tokenType,tokenValue] = req.headers["authorization"].split(' ')
    const decodeToken = jwt.decode(tokenValue,SECRET);
    
    const title = req.body.title;
    const contents = req.body.contents;
    if(title == null || contents == null){
        //빈칸존재
        res.send({"msg":'err1'})
        return;
    }
    data = [decodeToken.userid,decodeToken.username,title,contents];
    
    post.createPost(data)
    .then((result)=>{
        console.log(result)
        //등록 완료
        res.send({"msg":"good"})
        return;
    })
    .catch(()=>{
        res.send({"msg":'err1'})
    })

})
/** TODO:  게시물 전체 조회 */
routes.get('/',(req,res)=>{
    if(req.query.idx==null){
        if(req.query.idx == null){
            post.readPosts()
            .then((values)=>{
                res.status(200).send(values)
            })
            .catch(()=>{
                res.send({"msg":'err1'})
            })
        }else{
            //console.log("YES")
            post.readPost(req.query.idx)
            .then((value)=>{
                res.send(value)
            })
        }
    }else{
        //쿼리스트링 조회
        post.readPost(req.query.idx)
            .then((value)=>{
                console.log(value)
                res.send(value)
            })
            .catch(()=>{
                res.send({"msg":'err1'})
            })
    }
})
/** TODO: 게시물 수정 */
routes.put('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const [tokenType,tokenValue] = req.headers["authorization"].split(' ')
    const decodeToken = jwt.decode(tokenValue,SECRET);
    
    post.updatePost(req.query.idx,decodeToken.userid,req.body)
        .then(()=>{
            res.send({"msg": "update good"});
        })
        .catch(()=>{
            res.send({"msg": "update nop!"});
        })
})
/** TODO: 게시물 삭제 */
routes.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const [tokenType,tokenValue] = req.headers["authorization"].split(' ')
    const decodeToken = jwt.decode(tokenValue,SECRET);
    post.deletePost(req.query.idx,decodeToken.userid)
        .then(()=>{
            res.send({"msg": "delete good"});
        })
        .catch(()=>{
            res.send({"msg": "delete nop!"});
        })
})

module.exports = routes;