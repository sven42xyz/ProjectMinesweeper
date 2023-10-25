<template>
  <div class="App">
    <Landing />
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';
import Landing from './components/Landing.vue';

export default {
  name: 'App',
  components: {
    Landing
},

    /*
    created() {
      SocketioService.setupSocketConnection();
    },*/
    data() {
      return {
        username: '',
        inputMessageText: ''
      };
  },

  methods: {
    submitUsername() {
        console.log(this.username);
        SocketioService.setupSocketConnection(this.username);
    },

    submitMessage() {
      const CHAT_ROOM = "myRandomChatRoomId";
      const message = this.inputMessageText;
      SocketioService.sendMessage({message, roomName: CHAT_ROOM}, cb => {
        console.log(cb);
      });
    },
    
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
      background-color: #8f8aa4;
      height: 100%;
      margin: 0;
      min-height: 100%;
    }
</style>