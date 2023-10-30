import { createRouter, createWebHistory } from 'vue-router'
import CreateGame from '../components/vues/CreateGame.vue'
import JoinGame from '../components/vues/JoinGame.vue'
import LandingPage from '../components/vues/LandingPage.vue'
import Lobby from '../components/vues/LobbyView.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/create/:roomId/u/:userId', name: 'create', component: CreateGame },
    { path: '/join/u/:userId', name: 'join', component: JoinGame },
    { path: '/lobby/:roomId/u/:userId', name: 'lobby', component: Lobby },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;