const crypto = require('crypto');

class Utilities {
    constructor() { }

    randomId() {
        let randomBytes = crypto.randomBytes(4);
        return randomBytes.toString('hex');
    }

    getGameByRoomId(set, roomId) {
        let target = null;

        set.forEach((game) => {
            if (game.roomId === roomId) {
                target = game;
                return;
            }
        });
        return target;
    }
}

module.exports = Utilities

