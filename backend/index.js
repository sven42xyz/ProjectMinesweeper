const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080']
    }
});
const crypto = require('crypto');

handler.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log("Connection");
});

// set of all active users (in a room)
const activeUsers = new Set();
const activeGames = new Set();

const difficulties = new Map([
    ['dif-1', 'Easy'],
    ['dif-2', 'Medium'],
    ['dif-3', 'Hard'],
    ['dif-4', 'Insane'],
]);

/* function generateRoomId() {
    let roomId;
    const roomIds = activeGames.roomId;
    do {
        roomId = randomId();
    } while
        (roomIds.has(roomId));
    return roomId;
} */

function randomId() {
    const randomBytes = crypto.randomBytes(4);
    return randomBytes.toString('hex');
}

io.on('connection', (socket) => {
    console.log('someone wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;

        activeUsers.add({ 
            userid: socket.id,
            username: socket.username, 
        });

        io.emit('new user', [...activeUsers]);

        console.log('new user ' + socket.username + ' joined the server.');
    });

    socket.on('new game', (data, callback) => {
        const gameRoom = randomId();

        socket.join(gameRoom);

        console.log('new join: ' + socket.id + ' to room: ' + gameRoom);

        const game = {
            roomId: gameRoom,
            host: data,
            difficulty: null,
            players: {},
        };

        activeGames.add(game);

        console.log(socket.id);
        console.log(game.roomId);

        callback({
            status: 200,
            data: game,
        });
    });

    socket.on('join game', (data, callback) => {
        console.log(socket.id);

        callback({
            status: 200,
        });
    });

    socket.on('set options', (data, callback) => {
        diff = difficulties.get(data.difficulty);
        for (const game of activeGames) {
            if (game.roomId === data.roomId) {
                game.difficulty = diff;
                break;
            };
        };
        callback({
            status: 200,
        });
    });

    socket.on('delete game', (data, callback) => {
        for (const game of activeGames) {
            if (game.roomId === data.roomId) {
                activeGames.delete(game);
                break;
            };
        };
        callback({
            status: 200,
        });
    });

    socket.on('join lobby', (data, callback) => {
        console.log('new join: ' + socket.id + ' to room: ' + data.roomId);

        for (const game of activeGames) {
            if (game.roomId !== data.roomId) {
                console.log('Error: room not found');
                callback({
                    status: 400,
                });
                return;
            };
        };

        socket.join(data.roomId);
        callback({
            status: 200,
            data: data.roomId,
        });
    });


/*     socket.on('disconnect', () => {
        activeUsers.delete(socket.username);
        socket.leave('myRandomChatRoomId');
        io.emit('user disconnect', socket.username);

        console.log('the mines have been swept');
    }); */

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