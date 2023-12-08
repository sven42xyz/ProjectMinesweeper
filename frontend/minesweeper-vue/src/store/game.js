import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        game: {},
    }),
    getters: {
        gameState: (state) => state.game.state,
        gameDifficulty: (state) => state.game.difficulty,
        gameBoardMap: (state) => state.game,
    },
    actions: {
        setGame(data) {
            this.game = data;
        }
    }
});