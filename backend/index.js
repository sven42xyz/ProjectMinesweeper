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

/*io.use(async (socket, next) => {
    const username = socket.username;
    try {
        const user = username;
        console.log('user', user);
        socket.user = user;
        next();
    } catch (e) {
        // if token is invalid, close connection
        console.log('error', e.message);
        return next(new Error(e.message));
    }
});*/

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

    socket.on("message", ({message, roomName}, callback) => {
    console.log("message: " + message + " in " + roomName);
    
    /*// generate data to send to receivers
    const outgoingMessage = {
        name: socket.user.name,
        id: socket.user.id,
        message,
    };*/
    // send socket to all in room except sender
    socket.to(roomName).emit("message", message);
    callback({
        status: "ok"
    });
    // send to all including sender
    // io.to(roomName).emit("message", message);
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});