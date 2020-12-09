var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var socketio = require("socket.io");
// socket io---
// Create the http server 
const server = require('http').createServer(app); 
  
// Create the Socket IO server on  
// the top of http server 
const io = socketio(server); 

//--------


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = { app: app, server: server }; 
