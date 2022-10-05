const express = require('express');
const join = require('./auth/join');
const login = require('./auth/login');
const logout = require('./auth/logout');
const users = require('./users/users');
const posts = require('./posts/posts');
const routes = express.Router();
//const passport = new passport.Passport();

//TODO: 사용자 api
routes.use('/users',users);

//TODO: 인증 파트
routes.use('/auth/join', join);
routes.use('/auth/login', login);
routes.use('/auth/logout', logout);

//TODO: 게시물 관리 파트
routes.use('/posts',posts);

module.exports = routes;