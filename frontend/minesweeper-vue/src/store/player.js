import { defineStore } from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: [],
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