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
        ['dif-1', {size:  5}],
        ['dif-2', {size: 10}],
        ['dif-3', {size: 15}],
        ['dif-4', {size: 20}],
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
    
    setGameboard(difficulty) {
        const dimension = this.difficultyMap.get(difficulty);
        const bombs = Math.sqrt(dimension) / 5;
        var res = [];

        for (var i = 0; i < dimension; i++) {
            res[i] = []
            for (var j = 0; j < dimension; j++) {
                res[i][j] = new Button();
            }
        }
        for (i = 0; i < bombs; i++) {
            //Get random position for the next bomb
            var w = Math.floor(Math.random() * dimension);
            var h = Math.floor(Math.random() * dimension);
            while (res[w][h].isBomb) { //if this position is a bomb
                //we get a new position
                w = Math.floor(Math.random() * dimension);
                h = Math.floor(Math.random() * dimension);
            }
            res[w][h].IsBomb = true; //make new position is a bomb
        }
        for (i = 0; i < dimension; i++) { //1
            for (j = 0; j < dimension; j++) { // 0
                var neighbouringBombs = 0;
                for (var k = 0; k < 3; k++) {
                    for (var t = 0; t < 3; t++) {
                        var x = (i - 1 + k); // 0 > 1 > 2
                        var y = (j - 1 + t); // -1 > 0 > 1
                        if (x >= 0 && y >= 0 && x < dimension && y < dimension && res[x][y].IsBomb == true) {
                            neighbouringBombs++;
                        }
                    }
                }
                res[i][j].nBombs = neighbouringBombs;
            }
        }
        this.gameboard = res;
    }
}

module.exports = Game