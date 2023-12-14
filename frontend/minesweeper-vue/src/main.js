import "bootstrap/dist/css/bootstrap.min.css"
import "primevue/resources/themes/soho-dark/theme.css"
import "bootstrap"
import "../public/css/App.css"

import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import VueSocketIO from 'vue-socket.io'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import ColorPicker from "primevue/colorpicker"
import Tooltip from 'primevue/tooltip';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmationService from 'primevue/confirmationservice';
import { createPinia } from "pinia"
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);


app.use(router);
app.use(VueCookies, {
    expireTimes: '0',
    sameSite: 'Strict'
});
app.use(
    new VueSocketIO({
        connection: 'http://192.168.178.38:3000',
    })
);
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);
app.component('ColorPicker', ColorPicker);
app.directive('tooltip', Tooltip);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Toast-Toast', Toast);
app.mount('#app');
