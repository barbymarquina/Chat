const path= require('path');
const express= require('express');
const app= express();


app.set('port', process.env.PORT||3000);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//iniciar el servidor
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//websockets

const socketIO= require('socket.io');
const io = socketIO(server);

io.on('connection', (socket) =>{
    console.log('new conection', socket.id);

    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message', data);
    });
    socket.on('chat:typing', (data)=> {
    socket.broadcast.emit('chat:typing',data)
    });
})
