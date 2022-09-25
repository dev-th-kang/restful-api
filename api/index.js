const express = require('express');
const join = require('./join/join');
const login = require('./login/login');
const logout = require('./logout/logout');
const routes = express.Router();
//const passport = new passport.Passport();

routes.use('/join', join);
routes.use('/login', login);
routes.use('/logout', logout);
//routes.use(passport)
module.exports = routes;