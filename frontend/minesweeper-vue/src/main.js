import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "../public/css/App.css"

import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(router);
app.use(VueCookies, {
    expireTimes: '0',
    sameSite: 'Strict'
});
app.use(
    new VueSocketIO({
        connection: 'http://localhost:3000',
    })
);

app.mount('#app');
