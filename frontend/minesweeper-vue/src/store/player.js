import { defineStore } from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: [],
    }),
    getters: {
        totalPlayers: (state) => state.players.length,
        readyPlayers: (state) => state.players.filter(obj => obj.ready === true).length,
        playerUsernames: (state) => state.players.map(obj => obj.username),
        
    },
    actions: {
        setPlayers(data) {
            this.players.length = 0;
            this.players = data;
        }
    }
});