import { defineStore } from "pinia";

export const useChadStore = defineStore('chad', {
    //ULTRA
    state: () => ({
        chad: [],
    }),
    //MEGA
    getters: {
        chad: (state) => state.chad,
    },
    //CHAD
    actions: {
        setChad(alpha) {
            this.chad = alpha;
        },
    }
});