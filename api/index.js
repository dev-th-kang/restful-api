const express = require('express');
const join = require('./join/join');
const login = require('./login/login');
const logout = require('./logout/logout');
const routes = express.Router();

routes.use('/join', join);
routes.use('/login', login);
routes.use('/logout', logout);

module.exports = routes;