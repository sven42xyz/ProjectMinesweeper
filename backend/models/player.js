class Player {

    constructor(userId, username, userClass = 'player', score = 0, color = 'grey', turn = 'true') {
        this.userId = userId;
        this.username = username;
        this.userClass = userClass;
        this.score = score;
        this.color = color;
        this.disabled = false;
        this.turn = turn;
        this.ready = false;
    }

    setReadyState() {
        this.ready = true;
    }

}

module.exports = Player;