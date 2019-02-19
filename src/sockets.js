
module.exports = function(io){
    io.on('connection', socket => {
        console.log("Un nuevo usuario conectado");
        
        socket.on('send:message',function(data){
            io.sockets.emit('new:message',data);
        })
    
    });
    
}