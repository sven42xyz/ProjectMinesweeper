const { ok } = require('assert');
const { callbackify } = require('util');

const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

handler.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
});

io.on('connection', (socket) => {

    socket.join('myRandomChatRoomId');
    console.log('someone wants to sweep some mines!');

    socket.on('disconnect', () => {
        console.log('the mines have been swept');
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
    });
    
    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on('message', ({message, roomName}) => {
        console.log('message: ' + meesage + ' in ' + roomName);
        socket.to(roomName).emit('message', message);
        callback({
            status: 'ok'
        });
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});