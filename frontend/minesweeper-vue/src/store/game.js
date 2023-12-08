import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        game: {},
    }),
    getters: {
        gameState: (state) => state.game.state,
        gameDifficulty: (state) => state.game.difficulty,
        gameBoard: (state) => state.game.board,
    },
    actions: {
        setGame(data) {
            this.game = data;
        },
        setGameState(data) {
            this.game.state = data;
        },
        setGameBoard(data) {
            this.game.board = data;
        }
    }
});