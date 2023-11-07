const crypto = require('crypto');


class Utilities {
    constructor() { }

    randomId() {
        let randomBytes = crypto.randomBytes(4);
        return randomBytes.toString('hex');
    }

    getGameByRoomId(set, roomId) {
        let target = null;

        set.forEach((e) => {
            if (e.roomId === roomId) {
                return e;
            }
        });
        return target;
    }
}

module.exports = Utilities

