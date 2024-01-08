const Button = require('./button');

class Game {
    roomId = null;
    host = null;
    state = null;
    difficulty = null;
    players = null;
    gameboard = null;

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

    stateMap = new Map([
        [0, "created"],
        [1, "started"],
        [2, "terminated"],
    ])

    addPlayer(player) {
        if (this.players.length >= 6) {
            console.log('Game room already maxed out (6/6)');
            return;
        }
        this.players.push(player);
    }

    getGameboardSize() {
        const size = this.difficultyMap.get(this.difficulty).size;
        return size;
    }

    getGameboardCell(coordinates) {
        const row = coordinates.row - 1;
        const col = coordinates.col - 1;
        return this.gameboard[row][col];
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }

    setState(state) {
        this.state = state;
    }

    setStateByStateId(stateId) {
        this.state = this.stateMap.get(stateId)
    }
    
    setGameboard() {
        const dimension = this.difficultyMap.get(this.difficulty).size;
        const bombs = Math.pow(dimension, 2) / 5;
        let res = [];

        for (let i = 0; i < dimension; i++) {
            res[i] = []
            for (let j = 0; j < dimension; j++) {
                res[i][j] = new Button();
            }
        }
        for (let i = 0; i < bombs; i++) {
            //Get random position for the next bomb
            let w = Math.floor(Math.random() * dimension);
            let h = Math.floor(Math.random() * dimension);
            while (res[w][h].isBomb) { //if this position is a bomb
                //we get a new position
                w = Math.floor(Math.random() * dimension);
                h = Math.floor(Math.random() * dimension);
            }
            res[w][h].IsBomb = true; //make new position is a bomb
        }
        for (let i = 0; i < dimension; i++) { //1
            for (let j = 0; j < dimension; j++) { // 0
                let neighbouringBombs = 0;
                for (let k = 0; k < 3; k++) {
                    for (let t = 0; t < 3; t++) {
                        let x = (i - 1 + k); // 0 > 1 > 2
                        let y = (j - 1 + t); // -1 > 0 > 1
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