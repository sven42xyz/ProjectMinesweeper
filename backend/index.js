const Player = require('./models/player');
const Game = require('./models/game');
const Utilities = require('./utilities');

const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    allowEIO3: true, 
    cors: {
        origin: 'http://192.168.178.38:8080',
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true,
    }
});

handler.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
    console.log("Connection");
});


// set of all active users (in a room)
const activeGames = new Map();
const activeUsers = new Map();
const utils = new Utilities(activeGames, activeUsers);

io.on('connection', (socket) => {
    console.log(socket.id + ' wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;
        const player = new Player(socket.id, socket.username);
        activeUsers.set(socket.id, player);
        console.log('new user ' + socket.username + ' joined the server.');
    });
    
    socket.on('new game', (_, callback) => {
        const gameRoom = utils.getRandomId();
        socket.join(gameRoom);
        const game = new Game(gameRoom, socket.id);
        game.addPlayer(socket.id);
        activeGames.set(gameRoom, game);
        const username = utils.getUsernameOfPlayerByUserId(socket.id);
        if (!username) {
            console.log(`Could not get username of Player ${socket.id}`);
            callback({
                status: 500,
            });
        }

        callback({
            status: 200,
            roomId: game.roomId,
            userId: socket.id,
            username: username,
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
        const res = utils.addPlayerToGameByRoomId(data.roomId, data.userId);
        if (!res) {
            console.log(`Could not add Player to Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        const username = utils.getUsernameOfPlayerByUserId(socket.id);
        if (!username) {
            console.log(`Could not get username of Player ${socket.id}`);
            callback({
                status: 500,
            });
        }

        const players = utils.getPlayersOfGameByRoomId(data.roomId);
        if (!players) {
            console.log(`Could not get Players of Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        io.emit('join lobby', players);

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
            username: username,
            players: players,
        });
    }); 

    socket.on('set options', (data, callback) => {
        const res = utils.setDifficultyByRoomId(data.roomId, data.difficulty);
        if (!res) {
            console.log(`Could not set difficulty for Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        const players = utils.getPlayersOfGameByRoomId(data.roomId);
        if (!players) {
            console.log(`Could not get Players of Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
            players: players,
        });
    });

    socket.on('delete game', (data, callback) => {
        const host = utils.getHostOfGameByRoomId(data.roomId);
        if (!host) {
            console.log(`Could not get host of Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }
        if (host !== data.userId) {
            console.log(`Player ${data.userId} is not the host`);
            callback({
                status: 500,
            });
        }

        io.emit('delete game');

        const res = utils.killGameByRoomId(data.roomId);
        if (!res) {
            console.log(`Could not kill Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        callback({
            status: 200,
        });
    });

    socket.on('start game', (data, callback) => {
        //check if all players are ready to continue

        io.emit('start game');

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
        });
    });

    socket.on('player ready', (data, callback) => {
        const res = utils.setPlayerReadyStateByUserId(data.userId);
        if (!res) {
            console.log(`Could not set ready state for Player ${data.userId}`);
            callback({
                status: 500,
            });
        }

        const players = utils.getPlayersOfGameByRoomId(data.roomId);
        if (!players) {
            console.log(`Could not get Players of Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        io.emit('player ready', players);

        callback({
            status: 200,
        });
    })

/*     socket.on('disconnect', () => {
        activeUsers.delete(socket.username);
        socket.leave('myRandomChatRoomId');
        io.emit('user disconnect', socket.username);

        console.log('the mines have been swept');
    }); */


    //still needed?
    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });

    socket.on('message', ({ message, roomName }, callback) => {
        console.log("message: " + message + " in " + roomName);

        const username = utils.getUsernameOfPlayerByUserId(socket.id);
        if (!username) {
            console.log(`Could not get username of Player ${socket.id}`);
            callback({
                status: 500,
            });
        }

        // generate data to send to receivers
        const outgoingMessage = {
            name: username,
            id: socket.id,
            message,
        };

        console.log(outgoingMessage);
        // send socket to all in room except sender
        io.emit('message', outgoingMessage);
        callback({
            status: "ok"
        });
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});
