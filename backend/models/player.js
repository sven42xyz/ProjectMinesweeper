class Player {

    constructor(userId, username, userClass = 'player', score = 0) {
        this.userId = userId;
        this.username = username;
        this.userClass = userClass;
        this.score = score
    }

}

module.exports = Player;