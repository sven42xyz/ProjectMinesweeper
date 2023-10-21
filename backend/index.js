const { ok } = require('assert');

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

    //socket.join(socket.user.id);
    //Room for demo purposes
    socket.join('myRandomChatRoomId');
    console.log('someone wants to sweep some mines!');

    socket.on('disconnect', () => {
        //Ensures that the user leaves the server cleanly (i guess)
        socket.leave('myRandomChatRoomId');
        console.log('the mines have been swept');
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on('message', ({ message, roomName, callback }) => {
        console.log('message: ' + message + ' in ' + roomName);

        //Defines the message with metedata for easy handling on the frontend side
        const outgoingMessage = {
            name: socket.user.name,
            id: socket.user.id,
            message
        };

        //Sends a message to every room member ecept for the sender
        socket.to(roomName).emit('message', outgoingMessage);
        callback({
            status: 'ok'
        });

        //Sends a meesage to every room meber
        //socket.to(roomName).emit('message', message);
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});