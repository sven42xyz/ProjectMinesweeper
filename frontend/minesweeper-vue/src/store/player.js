import { defineStore } from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: [],
    }),
    getters: {
        getPlayers: (state) => state.players,
        totalPlayers: (state) => state.players.length,
        readyPlayers: (state) => state.players.filter(player => player.ready === true).length,
        playerUsernames: (state) => state.players.map(player => player.username),
        playerColors: (state) => state.players.map(player => player.color),
        playerByUserId: (state) => {
            return (userId) => state.players.find(player => player.userId === userId);
        },

    },
    actions: {
        setPlayers(data) {
            this.players.length = 0;
            this.players = data;
        },
        setColor(data) {
            this.players = this.players.map(
                player => (player.userId === data.userId ? {...player, color: data.color} : player)
            );
        },
    }
});