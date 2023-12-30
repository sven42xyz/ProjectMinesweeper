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
        return game;
    }

    getPlayerByUserId(userId) {
        const player = this.playerMap.get(userId);
        if (!player) {
            return false;
        }
        return player;
    }

    getGameboardCell(game, coordinates) {
        const row = coordinates.row - 1;
        const col = coordinates.col - 1;
        return game.gameboard[row][col];
    }

    setPlayerGameOver(player, message) {
        console.log(message);
        player.disabled = true;
    }

    handleGameboardClickByUserId(userId, roomId, coordinates, refs) {
        const player = this.getPlayerByUserId(userId);
        const game = this.getGameByRoomId(roomId);
        const gameboardSize = this.getSizeByRoomId(roomId);
        const color = `#${player.color}`;

        const gameboardRow = coordinates.row - 1;
        const gameboardCol = coordinates.col - 1;

        console.log(`refs beginning: ${refs}`);

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
            console.log(`${player.username} lost with a score of ${player.score}`);
            this.setPlayerGameOver(player, "you are out");
        } else if (gameboardCell.nBombs != 0) {
            entryData.isNumber = gameboardCell.nBombs;
            player.score += 1;
        } else {
            player.score += this.gameboardRevealNeighbours(game.gameboard, gameboardSize, gameboardRow, gameboardCol, color, refs);
        }


        let won = this.gameboardCheckIfAllRevealed(player, game.gameboard, gameboardSize, refs);
        if (won != null) {
            this.setPlayerGameOver(player, won);
        }

        console.log(`refs ending: ${refs}`);
    }

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

    gameboardCheckIfAllRevealed(player, gameboard, gameboardSize, refs) {
        for (let i = 0; i < gameboardSize; i++) {
            for (let j = 0; j < gameboardSize; j++) {
                const cell = gameboard[i][j];

                if (!cell.IsBomb && !cell.IsRevealed) {
                    return null;
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

        return `${player.username} won with a score of ${player.score}`;
    }

    gameboardReveal(refs, cur) {
        const refEntry = refs.find(entry => entry[0] === cur);
        refEntry[1][0].color = 'darkred';
        refEntry[1][0].isBomb = 'X';
        refEntry[1][0].enabled = 'none';
    }
}

module.exports = Game