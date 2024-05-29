const { Socket } = require('dgram');
const express = require('express');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection',(socket)=>{
    console.log('a user connected', socket.id)
    socket.on('disconnect',()=>{
        console.log('user disconnected', socket.id)
    })
    socket.on('chat message',(msg)=>{
        console.log('message:',msg)
        io.emit('chat message',msg)
    })
});





app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


let port = 4000;
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})