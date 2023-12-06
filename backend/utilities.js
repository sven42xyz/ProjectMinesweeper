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

    setDifficultyByRoomId(roomId, difficulty) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.setDifficulty(difficulty);
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

    addPlayerToGameByRoomId(roomId, userId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.addPlayer(userId);
        return true;
    }

    killGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        this.gameMap.delete(roomId);
        return true;
    }
}

module.exports = Utilities

