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

    handlePlayer(player, game, totalPlayers, score = 0, bomb = true, won = false) {

        //single player
        if (totalPlayers === 1) {
            player.setScore(score)
            player.setStateByStateId(3)
            if (bomb) {
                player.setStateByStateId(4)
            }
            if (won) {
                player.setStateByStateId(5)
            }
            return
        }

        //multi player
        if (totalPlayers !== 1) {
            const players = this.getPlayersOfGameByRoomId(game.roomId)
            player.setScore(score)
            player.setStateByStateId(2)
            player.setDisabled(true)
            if (bomb) {
                player.setStateByStateId(4)
                const totalLost = players.filter(player => player.state === "lost").length
                if ((totalPlayers - totalLost) <= 1) {
                    const winner = players.find(player => player.state !== "lost")
                    winner.setStateByStateId(5)
                }
            }
            if (won) {
                player.setStateByStateId(5)
            }
            return
        }
    }

    handleGame(game, currentPlayer, bomb = true) {
        const players = this.getPlayersOfGameByRoomId(game.roomId)
        const total = players.length
        //single player -> game condition term
        if (total == 1) {
            if (bomb) {
                game.setStateByStateId(2)
            }
            return
        }
        const totalLost = players.filter(player => player.state === "lost").length
        //multi player -> game condition term
        if ((total - totalLost) <= 1) {
            game.setStateByStateId(2)
            return
        }
        //switch to next player if game condition term isn't met
        const activePlayers = players.filter(player => player.state !== "lost")
        console.log(players)
        console.log(activePlayers)
        const currentIndex = activePlayers.findIndex(player => player.userId === currentPlayer)
        const nextIndex = (currentIndex + 1) % total
        const nextPlayer = players[nextIndex]
        nextPlayer.setStateByStateId(3)
        nextPlayer.setDisabled(false)
        return
    }

    handleGameboardClickByUserId(userId, roomId, coordinates, refs) {
        let res = null;
        const player = this.getPlayerByUserId(userId);
        const game = this.getGameByRoomId(roomId);
        const totalPlayers = this.getPlayersOfGameByRoomId(game.roomId).length
        const gameboardSize = this.getSizeByRoomId(roomId);
        const color = `#${player.color}`;

        const gameboardRow = coordinates.row - 1;
        const gameboardCol = coordinates.col - 1;

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

            this.handlePlayer(player, game, totalPlayers)
            this.handleGame(game)
        } else if (gameboardCell.nBombs != 0) {
            entryData.isNumber = gameboardCell.nBombs;

            this.handlePlayer(player, game, totalPlayers, 1, false)
            this.handleGame(game, userId, false)
        } else {
            const score = this.gameboardRevealNeighbours(game.gameboard, gameboardSize, gameboardRow, gameboardCol, color, refs);

            this.handlePlayer(player, game, totalPlayers, score, false)
            this.handleGame(game, userId, false)
        }

        const won = this.gameboardCheckIfAllRevealed(game.gameboard, gameboardSize, refs);
        if (won) {
            this.handlePlayer(player, game, totalPlayers, 0, false, true);
            game.setStateByStateId(2);
        }

        res = { refEntries: refs };

        return res;
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
                        score += this.gameboardRevealNeighbours(gameboard, gameboardSize, x , y, color, refs);
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
                    this.gameboardReveal(refs, cur);
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