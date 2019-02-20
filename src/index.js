const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio.listen(server);

const mongoose = require('mongoose');
//dbConnection
mongoose.connect('mongodb://localhost/chat-database')
.then(db => console.log('db is connected'))
.catch(err => console.log('error'))

//settings 
app.set('port',process.env.PORT || 3000);

require('./sockets')(io);

// static files
app.use(express.static(path.join(__dirname,'public')));
//Starting Server
server.listen(app.get('port'),() => {
console.log("server on port ",app.get('port'));
})