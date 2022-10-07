const express = require('express');
const join = require('./auth/join');
const login = require('./auth/login');
const logout = require('./auth/logout');
const auth = require('./auth/auth');
const posts = require('./posts/posts');
const { route } = require('./posts/posts');
const routes = express.Router();
//const passport = new passport.Passport();
//passport middleware
require('../middleware/passport-jwt')

//TODO: 사용자 api
routes.use('/auth',auth);

//TODO: 인증 파트
routes.use('/auth/join', join);
routes.use('/auth/login', login);
routes.use('/auth/logout', logout);

//TODO: 게시물 관리 파트
routes.use('/posts',posts);

module.exports = routes;