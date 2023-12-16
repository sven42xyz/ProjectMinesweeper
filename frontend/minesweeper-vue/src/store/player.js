import { defineStore } from "pinia";

export const usePlayerStore = defineStore('players', {
    state: () => ({
        players: [],
    }),
    getters: {
        totalPlayers: (state) => state.players.length,
        readyPlayers: (state) => state.players.filter(obj => obj.ready === true).length,
        playerUsernames: (state) => state.players.map(obj => obj.username),
        playerColors: (state) => state.players.map(obj => obj.color),
        playerByUserId: (state) => {
            return (userId) => state.players.find(obj => obj.userId === userId);
        },
    },
    actions: {
        setPlayers(data) {
            this.players.length = 0;
            this.players = data;
        },
        setColor(data) {
            this.players = this.players.map(
                obj => (obj.userId === data.userId ? {...obj, color: data.color} : obj)
            );
        },
    }
});