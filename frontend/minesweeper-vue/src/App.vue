<template>
  <div class="App">
    <div>
      <router-view/>
    </div>
  </div>
</template>


<!--   ROUTES:
  / -> LandingPage
  /join -> JoinGame
  /create -> CreateGame
  /lobby -> Lobby -->


<!--  @Michelle
  für deine Info: die App.vue dient fortan nur noch als Base für die anderen Vues. 
  Diese laden wir je nach State in die "router-view".
  Das einzige was wir noch auf die App.vue packen könnten wäre ein footer, der dann auf allen Seiten drauf wäre.

  Hab das mal auskommentiert, falls du noch was hiervon brauchst. Wenn nicht, kannst du es gerne löschen :) -->


<script>
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      activeComponent: 'Lobby',
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