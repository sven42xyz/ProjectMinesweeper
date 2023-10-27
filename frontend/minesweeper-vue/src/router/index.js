import { createRouter, createWebHistory } from 'vue-router'
import CreateGame from '../components/vues/CreateGame.vue'
import JoinGame from '../components/vues/JoinGame.vue'
import LandingPage from '../components/vues/LandingPage.vue'
import Lobby from '../components/vues/Lobby.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: '/create/:id', name: 'create', component: CreateGame },
    { path: '/join', name: 'join', component: JoinGame },
    { path: '/lobby/:id', name: 'lobby', component: Lobby },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;