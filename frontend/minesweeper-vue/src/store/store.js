import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            gameReady: false,
        }
    },
    mutations: {
        gameReadyState (state, data) {
            if (data.status !== 200) {
                state.gameReady = data.state
            }
        },
        
    }
});

export default store;