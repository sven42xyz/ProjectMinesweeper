const Player = require('./models/player');
const Game = require ('./models/game');

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

function randomId() {
    const randomBytes = crypto.randomBytes(4);
    return randomBytes.toString('hex');
}

io.on('connection', (socket) => {
    console.log('someone wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;

        const player = new Player(socket.id, socket.username);

        activeUsers.add(player);

        console.log(activeUsers);

        io.emit('new user', [...activeUsers]);

        console.log('new user ' + socket.username + ' joined the server.');
    });

    socket.on('new game', (_, callback) => {
        const gameRoom = randomId();

        socket.join(gameRoom);

        console.log('new join: ' + socket.id + ' to room: ' + gameRoom);

        const game = new Game(gameRoom, socket.id);

        activeGames.add(game);

        console.log(activeGames);

        console.log(socket.id);
        console.log(game.roomId);

        callback({
            status: 200,
            roomId: game.roomId,
            userId: socket.id,
        });
    });

    socket.on('join game', (_, callback) => {
        console.log(socket.id);

        for (const game of activeGames) {
            for (let i in game.players) {
                console.log(game.players);
                if (i === null) {
                    console.log(i);
                    i = socket.id;
                    break;
                };
            }
        };

        console.log(activeGames);

        callback({
            status: 200,
            userId: socket.id,
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
            roomId: data.roomId,
            userId: data.userId,
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
        console.log('new join: ' + data.userId + ' to room: ' + data.roomId);

        for (const game of activeGames) {
            if (game.roomId === data.roomId) {
                socket.join(data.roomId);
                callback({
                    status: 200,
                    roomId: data.roomId,
                    userId: data.userId,
                });
                return;
            };
        };

        console.log('Error: room not found');
        callback({
            status: 400,
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