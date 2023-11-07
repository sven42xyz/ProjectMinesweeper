import { createRouter, createWebHistory } from 'vue-router'
import CreateGame from '../components/vues/CreateGame.vue'
import JoinGame from '../components/vues/JoinGame.vue'
import LandingPage from '../components/vues/LandingPage.vue'
import Lobby from '../components/vues/LobbyView.vue'
import Game from '../components/vues/GameView.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/create', name: 'create', component: CreateGame },
    { path: '/join', name: 'join', component: JoinGame },
    { path: '/lobby', name: 'lobby', component: Lobby },
    { path: '/game', name: 'game', component: Game },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;