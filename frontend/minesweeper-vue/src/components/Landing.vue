<template>
  <div class="d-flex justify-content-center">
    <div class="card text-bg-primary mb-3" style="width: 36rem;">
      <div class="card-body">
        <h1 class="card-header mb-4">Minesweeper.io</h1>
        <form @submit.prevent="submitUsername">
          <div class="d-flex justify-content-center">
            <div class="input-group md-4 w-75 mb-3">
              <span class="input-group-text" id="basic-addon1">username</span>
              <input type="text" class="form-control" aria-label="Username" v-model="username">
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="text-center w-25">
              <button class="btn btn-danger mb-1" type="Submit" id="Submit-Button" aria-expanded="false">New
                Game</button>
              <button class="btn btn-warning mt-1" type="Submit" id="Submit-Button" aria-expanded="false">Join
                Game</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from '../services/socketio.service.js';

export default {
  name: 'App',
  components: {

  },

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
      SocketioService.sendMessage({ message, roomName: CHAT_ROOM }, cb => {
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
  margin-top: 60px;
}
</style>