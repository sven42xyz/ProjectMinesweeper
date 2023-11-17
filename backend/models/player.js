class Player {

    constructor(userId, username, userClass = 'player', score = 0, color) {
        this.userId = userId;
        this.username = username;
        this.userClass = userClass;
        this.score = score;
        this.color = color;
        this.disabled = false;
    }

}

module.exports = Player;