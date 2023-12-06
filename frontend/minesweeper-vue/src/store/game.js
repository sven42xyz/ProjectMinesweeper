import { defineStore } from "pinia";

export const useGameStore = defineStore('game', {
    state: () => ({
        game: [],
    }),
    getters: {
        totalPlayers: (state) => state.players.length,
    },
    actions: {
        setPlayers(data) {
            this.players.length = 0;
            this.players = data;
        }
    }
});