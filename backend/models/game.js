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
        this.gameboard = [];
    }

    difficultyMap = new Map([
        ['dif-1', {rows: 1, cols: 1}],
        ['dif-2', {rows: 1, cols: 1}],
        ['dif-3', {rows: 1, cols: 1}],
        ['dif-4', {rows: 1, cols: 1}],
    ]);

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

    createBoard(row, col) {
        var a = []
        var bombs = row * col / 5;
        for (var i = 0; i < row; i++) {
            a[i] = []
            for (var j = 0; j < col; j++) {
                a[i][j] = new Button();
            }
        }
        for (i = 0; i < bombs; i++) {
            //Get random position for the next bomb
            var w = Math.floor(Math.random() * col);
            var h = Math.floor(Math.random() * row);
            while (a[w][h].isBomb) { //if this position is a bomb
                //we get a new position
                w = Math.floor(Math.random() * col);
                h = Math.floor(Math.random() * row);
            }
            a[w][h].IsBomb = true; //make new position is a bomb
        }
        for (i = 0; i < row; i++) { //1
            for (j = 0; j < col; j++) { // 0
                var neighbouringBombs = 0;
                for (var k = 0; k < 3; k++) {
                    for (var t = 0; t < 3; t++) {
                        var x = (i - 1 + k); // 0 > 1 > 2
                        var y = (j - 1 + t); // -1 > 0 > 1
                        if (x >= 0 && y >= 0 && x < row && y < row && a[x][y].IsBomb == true) {
                            neighbouringBombs++;
                        }
                    }
                }
                a[i][j].nBombs = neighbouringBombs;
            }
        }
        return a
    }
}

module.exports = Game