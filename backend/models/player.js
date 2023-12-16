class Player {

    constructor(userId, username, userClass = 'player', score = 0) {
        this.userId = userId;
        this.username = username;
        this.userClass = userClass;
        this.score = score;
        this.color = null;
        this.disabled = false;
        this.turn = false;
        this.ready = false;
    }

    setReadyState() {
        this.ready = true;
    }

    setColorByHEX(colorHEX) {
        this.color = colorHEX;
    }
}

module.exports = Player;