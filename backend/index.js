const Player = require('./models/player');
const Game = require('./models/game');
const Utilities = require('./utilities');
const utils = new Utilities();

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
const activeGames = new Map();

function setDifficultyByRoomId(roomId, difficulty) {
    const instance = activeGames.get(roomId);
    if (instance) {
        instance.setDifficulty(difficulty);
    }
}

function addPlayerByRoomId(roomId, userId) {
    const instance = activeGames.get(roomId);
    if (instance) {
        instance.addPlayer(userId);
    }
}

function getPropertyByRoomId(roomId, property) {
    const instance = activeGames.get(roomId);
    if (instance) {
        return instance[property];
    }
}

function killGameByRoomId(roomId, userId) {
    const instance = activeGames.get(roomId);
    if (instance) {
        return instance[property];
    }
}

io.on('connection', (socket) => {
    console.log(socket.id + ' wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;
        const player = new Player(socket.id, socket.username);
        activeUsers.add(player);
        console.log(activeUsers);
        console.log('new user ' + socket.username + ' joined the server.');
    });

    socket.on('new game', (_, callback) => {
        const gameRoom = utils.randomId();
        socket.join(gameRoom);

        const game = new Game(gameRoom, socket.id);

        game.addPlayer(socket.id);

        activeGames.set(gameRoom, game);

        console.log(activeGames);

        callback({
            status: 200,
            roomId: game.roomId,
            userId: socket.id,
        });
    });

    socket.on('join game', (_, callback) => {
        callback({
            status: 200,
            userId: socket.id,
        });
    });

    socket.on('join lobby', (data, callback) => {
        socket.join(data.roomId);
        addPlayerByRoomId(data.roomId, data.userId);

        console.log(activeGames);

        console.log(getPropertyByRoomId(data.roomId, 'players'));

        io.to(roomId).emit(getPropertyByRoomId(data.roomId, 'players'));

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
        });
    }); 

    socket.on('set options', (data, callback) => {
        setDifficultyByRoomId(data.roomId, data.difficulty);

        console.log(activeGames);

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
        });
    });

    socket.on('delete game', (data, callback) => {
        const game = new Game(utils.getGameByRoomId(activeGames, data.roomId));
        if (game.host !== data.userId) {
            return;
        }

        socket.to(game.roomId).emit('game deleted');
        activeGames.delete(game);
        console.log(activeGames);

        callback({
            status: 200,
        });
    });

    socket.on('player join', (data, callback) => {
        /*         const game = new Game(utils.getGameByRoomId(activeGames, data.roomId)); */

        const game = utils.getGameByRoomId(activeGames, data.roomId);

        console.log(game);

        callback({
            status: 200,
            players: game,
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