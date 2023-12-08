class Game {
    roomId = null;
    host = null;
    state = null;
    difficulty = null;
    players = null;
    board = null;

    constructor(roomId, host) {
        this.roomId = roomId;
        this.host = host;
        this.state = null;
        this.difficulty = null;
        this.players = [];
        this.board = [];
    }

/*     difficultyMap = new Map([
        ['dif-1', 'Easy'],
        ['dif-2', 'Medium'],
        ['dif-3', 'Hard'],
        ['dif-4', 'Insane'],
    ]); */

    addPlayer(player) {
        if (this.players.length >= 6) {
            console.log('Game room already maxed out (6/6)');
            return;
        }
        this.players.push(player);
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    setState(state) {
        this.state = state;
    }
    
    setBoard(board) {
        this.board = board
    }
}

module.exports = Game