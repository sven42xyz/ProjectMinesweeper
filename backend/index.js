const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080']
    }
});

handler.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log("Connection");
});

// set of all active users (in a room)
const activeUsers = new Set();
const activeGames = new Set();

io.on('connection', (socket) => {
    // make room generator
    socket.join('myRandomChatRoomId');
    console.log('someone wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;
        activeUsers.add(username);
        io.emit('new user', [...activeUsers]);

        console.log('user ' + username + ' joined');
    });

    socket.on('new game', (data, callback) => {
        // todo: gameRoomGenerator
        const gameRoom = 12345;

        const game = {
            roomId: gameRoom,
            host: data,
            difficulty: null,
            players: {},
        };

        activeGames.add(game);

        socket.to('myRandomChatRoomId').emit("new game", game);
        callback({
            status: "ok",
            data: game,
        });
    })

    socket.on('disconnect', () => {
        activeUsers.delete(socket.username);
        socket.leave('myRandomChatRoomId');
        io.emit('user disconnect', socket.username);

        console.log('the mines have been swept');
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on("message", ({ message, roomName }, callback) => {
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
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});