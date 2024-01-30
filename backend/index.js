const GameModel = require('./models/game');
const PlayerModel = require('./models/player');
const GameLogic = require('./game/game');
const Utilities = require('./utilities');

const handler = require('express')();
const server = require('http').createServer(handler);
const io = require('socket.io')(server, {
    allowEIO3: true, 
    cors: {
        origin: 'http://172.17.224.127:8080',
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
const gameLogic = new GameLogic(activeGames, activeUsers);


io.on('connection', (socket) => {
    console.log(socket.id + ' wants to sweep some mines!');

    socket.on('new user', (data) => {
        socket.username = data;
        const player = new PlayerModel(socket.id, socket.username);
        const playerColor = utils.getRandomHexColor();
        player.setColorByHEX(playerColor);
        activeUsers.set(socket.id, player);
        console.log(player);
        console.log('new user ' + socket.username + ' joined the server.');
    });
    
    socket.on('new game', (_, callback) => {
        const gameRoom = utils.getRandomId();
        socket.join(gameRoom);
        const game = new GameModel(gameRoom, socket.id);
        game.addPlayer(socket.id);
        activeGames.set(gameRoom, game);

        const setHost = utils.setPlayerUserClassByUserId("host", socket.id);
        if (!setHost) {
            console.log(`Could not set userClass "host" of Player ${socket.id}`);
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

        const game = utils.getGameByRoomId(data.roomId);
        if (!game) {
            console.log(`Could not get Game of room ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        io.emit('update playerStore', players);

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
            username: username,
            players: players,
            game: game,
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

        const gameboard = utils.setGameboardByRoomId(data.roomId);
        if (!gameboard) {
            console.log(`Could not set gameboard for Game ${data.roomId}`);
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

        const game = utils.getGameByRoomId(data.roomId);
        if (!game) {
            console.log(`Could not get Game of room ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
            players: players,
            game: game,
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
        const res = utils.checkReadyPlayersByRoomId(data.roomId);
        if (res) {
            io.emit('enter game');

            callback({
                status: 200,
                roomId: data.roomId,
                userId: data.userId,
            });
            return;
        }

        console.log(`Not all players are ready yet in Game ${data.roomId}`);
        callback({
            status: 500,
        });
    });

    socket.on('enter game', (data, callback) => {
        callback({
            status: 200,
            roomId: data.roomId,
            userId: data.userId,
        });
        return;
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

        io.emit('update playerStore', players);

        callback({
            status: 200,
        });
    });

    socket.on('change color', (data, callback) => {
        const res = utils.setPlayerColorByUserId(data.userId, data.color);
        if (!res) {
            console.log(`Could not set color for Player ${data.userId}`);
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

        io.emit('update playerStore', players);

        callback({
            status: 200,
        });
    });

    socket.on("field click", (data, callback) => {
        const gameboard = gameLogic.handleGameboardClickByUserId(data.userId, data.roomId, data.coordinates, data.refs);

        const players = utils.getPlayersOfGameByRoomId(data.roomId);
        if (!players) {
            console.log(`Could not get Players of Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }
        
        const game = utils.getGameByRoomId(data.roomId);
        if (!game) {
            console.log(`Could not get Game of room ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        io.emit("update gameboard", gameboard);
        io.emit("update scoreboard", players);
        io.emit("update gameStore", game);

        callback({
            game: gameboard,
            status: 200,
        });
    });

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

    socket.on("restart game", (data, callback) => {
        const gameboard = utils.setGameboardByRoomId(data.roomId)
        if (!gameboard) {
            console.log(`Could not set gameboard for Game ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        const res = utils.resetGameByRoomId(data.roomId)
        if (!res) {
            console.log(`Could not reset Game ${data.roomId}`);
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

        const game = utils.getGameByRoomId(data.roomId);
        if (!game) {
            console.log(`Could not get Game of room ${data.roomId}`);
            callback({
                status: 500,
            });
        }

        io.emit("reset gameboard", "hello there");
        io.emit("restart");
        io.emit("update scoreboard", players);
        io.emit("update gameStore", game);

        callback({
            status: 200,
        });
    });
});

server.listen(3000, () => {
    console.log('Listening on port :3000');
});
