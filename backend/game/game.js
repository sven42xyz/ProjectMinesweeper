class Game {
    constructor(gameMap, playerMap) {
        this.gameMap = gameMap;
        this.playerMap = playerMap;
    }

    getGameByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        return game;
    }

    getSizeByRoomId(roomId) {
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        return game.getGameboardSize();
    }

    getPlayerByUserId(userId) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        return player;
    }

    getPlayersOfGameByRoomId(roomId) {
        let players = [];
        const game = this.gameMap.get(roomId);
        if (!game) {
            return false;
        }
        game.players.forEach((player) => {
            players.push(this.playerMap.get(player))
        });
        return players;
    }

    getGameboardCell(game, coordinates) {
        const row = coordinates.row - 1;
        const col = coordinates.col - 1;
        return game.gameboard[row][col];
    }

    handlePlayerGameOver(player, message) {
        console.log(message);
        player.disabled = true;
    }

    handlePlayer(player, score = 0, bomb = true) {
        player.setScore(score)
        player.setStateByStateId(2)
        if (bomb) {
            player.setStateByStateId(4)
        }
    }

    handleGame(game, currentPlayer, bomb = true) {
/*         const players = this.getPlayersOfGameByRoomId(game.roomId)
        console.log(players)
        const total = players.length
        //single player -> game condition term
        if (total === 1 && bomb) {
            game.setStateByStateId(2)
            return
        }
        const totalLost = players.filter(player => player.state === "lost").length
        //multi player -> game condition term
        if ((total - totalLost) <= 1) {
            game.setStateByStateId(2)
            return
        }
        //switch to next player if game condition term isn't met
        const currentIndex = players.findIndex(player => player.userId === currentPlayer)
        console.log(`CurrentIndex: ${currentIndex}`)
        const nextIndex = (currentIndex + 1) % total
        console.log(`NextIndex: ${nextIndex}`)
        const nextPlayer = players[nextIndex]
        console.log(nextPlayer) */

        console.log(`Next round :) - ${currentPlayer}`)
        return
    }

    handleGameboardClickByUserId(userId, roomId, coordinates, refs) {
        const player = this.getPlayerByUserId(userId);
        const game = this.getGameByRoomId(roomId);
        const gameboardSize = this.getSizeByRoomId(roomId);
        const color = `#${player.color}`;

        const gameboardRow = coordinates.row - 1;
        const gameboardCol = coordinates.col - 1;

/*         console.log(`refs beginning: ${JSON.stringify(refs)}`);
 */
        const check = `[${coordinates.row},${coordinates.col}]`;
        const refEntry = refs.find(entry => entry[0] === check);
        const entryData = refEntry[1][0];
        entryData.color = color;
        entryData.enabled = 'none';
    
        const gameboardCell = game.getGameboardCell(coordinates);

        gameboardCell.setIsRevealed();

        if (gameboardCell.IsBomb) {
            entryData.isBomb = 'X';
            entryData.color = 'darkred';

            this.handlePlayer(player)
            this.handleGame(game)
        } else if (gameboardCell.nBombs != 0) {
            entryData.isNumber = gameboardCell.nBombs;

            this.handlePlayer(player, 1, false)
            this.handleGame(game, userId, false)
        } else {
            const score = this.gameboardRevealNeighbours(game.gameboard, gameboardSize, gameboardRow, gameboardCol, color, refs);

            this.handlePlayer(player, score, false)
            this.handleGame(game, userId, false)
        }

        console.log(player)


        let won = this.gameboardCheckIfAllRevealed(game.gameboard, gameboardSize, refs);
        if (won != null) {
            this.handlePlayerGameOver(player, won);
        }

        return

/*         console.log(`refs ending: ${JSON.stringify(refs)}`);
 */    }

    gameboardRevealNeighbours(gameboard, gameboardSize, row, col, color, refs) {
        let score = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const x = row + i;
                const y = col + j;

                if (x >= 0 && y >= 0 && x < gameboardSize && y < gameboardSize) {
                    const cur = `[${x + 1},${y + 1}]`;
                    const refEntry = refs.find(entry => entry[0] === cur);
                    const currentCell = gameboard[x][y];

                    if (currentCell.IsBomb) {
                        continue;
                    } else if (currentCell.nBombs !== 0 && !currentCell.IsRevealed) {
                        this.gameboardUpdateEntry(refEntry, color);
                        currentCell.setIsRevealed();
                        refEntry[1][0].isNumber = currentCell.nBombs;
                        score += 1;
                    } else if (!currentCell.IsRevealed) {
                        this.gameboardUpdateEntry(refEntry, color);
                        currentCell.setIsRevealed();
                        score += this.gameboardRevealNeighbours(gameboard, x, y, color, refs);
                    }
                }
            }
        }
        return score;
    }

    gameboardUpdateEntry(entry, color) {
        entry[1][0].color = color;
        entry[1][0].enabled = 'none';
    }

    gameboardCheckIfAllRevealed(gameboard, gameboardSize, refs) {
        for (let i = 0; i < gameboardSize; i++) {
            for (let j = 0; j < gameboardSize; j++) {
                const cell = gameboard[i][j];
                if (!cell.IsBomb && !cell.IsRevealed) {
                    return false;
                }
            }
        }

        for (let i = 0; i < gameboardSize; i++) {
            for (let j = 0; j < gameboardSize; j++) {
                const cell = gameboard[i][j];

                if (cell.IsBomb && !cell.IsRevealed) {
                    const cur = `[${i + 1},${j + 1}]`;
                    gameboardReveal(refs, cur);
                    cell.setIsRevealed();
                }
            }
        }

        return true;
    }

    gameboardReveal(refs, cur) {
        const refEntry = refs.find(entry => entry[0] === cur);
        refEntry[1][0].color = 'darkred';
        refEntry[1][0].isBomb = 'X';
        refEntry[1][0].enabled = 'none';
    }
}

module.exports = Game