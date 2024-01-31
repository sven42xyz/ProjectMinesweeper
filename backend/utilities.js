const crypto = require('crypto');


class Utilities {
    constructor(gameMap, playerMap) {
        this.gameMap = gameMap;
        this.playerMap = playerMap;
    }

    getRandomId() {
        let randomBytes = crypto.randomBytes(4);
        return randomBytes.toString('hex');
    }

    getPlayersOfGameByRoomId(roomId) {
        let players = [];
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.players.forEach((player) => {
            players.push(this.playerMap.get(player))
        });
        return players;
    }

    getHostOfGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        return game.host;
    }

    getUsernameOfPlayerByUserId(userId) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        return player.username;
    }

    getGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        return game;
    }

    setDifficultyByRoomId(roomId, difficulty) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.setDifficulty(difficulty);
        return true;
    }

    setGameboardByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.setGameboard();
        return game.gameboard;
    }

    setPlayerUserClassByUserId(userClass, userId) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        player.setUserClass(userClass);
        return true;
    }

    setPlayerReadyStateByUserId(userId) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        player.setReadyState();
        return true;
    }

    setPlayerColorByUserId(userId, color) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        player.setColorByHEX(color);
        return true;
    }

    addPlayerToGameByRoomId(roomId, userId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.addPlayer(userId);
        return true;
    }

    resetGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId)
        if (!game) {
            return false
        }
        game.setStateByStateId(1)
        game.players.forEach(userId => {
            const player = this.playerMap.get(userId)
            if (!player) {
                return false;
            }
            if (player.userClass === "host") {
                player.setStateByStateId(3)
            } else {
                player.setStateByStateId(1)

            }
            player.nilScore()
        })
        return true   
    }

    killGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        this.gameMap.delete(roomId);
        return true;
    }

    checkReadyPlayersByRoomId(roomId) {
        const players = this.getPlayersOfGameByRoomId(roomId);
        if (!players) {
            return false;
        }
        const totalPlayers = players.length;
        const readyPlayers = players.filter(obj => obj.ready === true).length;
        if (totalPlayers !== readyPlayers) {
            return false;
        }
        if (totalPlayers === readyPlayers) {
            return true;
        }
    }

    getRandomHexColor() {
        // Generate a random number between 0 and 16777215 (FFFFFF in hexadecimal)
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        // Pad the color with zeros to ensure it always has six digits
        return "0".repeat(6 - randomColor.length) + randomColor;
    }
}

module.exports = Utilities

