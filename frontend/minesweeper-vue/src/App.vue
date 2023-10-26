<template>
  <div class="App">
    <div>
      <!-- current comp defined in data -->
      <component v-bind:is="activeComponent"></component>
    </div>

  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';
import LandingPage from './components/vues/LandingPage.vue';
import CreateGame from './components/vues/CreateGame.vue';
import JoinGame from './components/vues/JoinGame.vue';

export default {
  name: 'App',
  components: {
    LandingPage,
    CreateGame,
    JoinGame
  },

  data() {
    return {
      activeComponent: 'LandingPage',
    };
  },

  methods: {
        /*     submitUsername() {
          console.log(this.username);
          SocketioService.setupSocketConnection(this.username);
        },
    
        submitMessage() {
          const CHAT_ROOM = "myRandomChatRoomId";
          const message = this.inputMessageText;
          SocketioService.sendMessage({ message, roomName: CHAT_ROOM }, cb => {
            console.log(cb);
          });
            }, */

    beforeUnmount() {
      SocketioService.disconnect();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #3a3861;
  height: 100vh;
  width: 100vw;
  margin: 0;
  min-height: 100%;
}
</style>