<template>
  <!--   <img alt="Vue logo" src="./assets/logo.png">
  <div class="App">
    <form @submit.prevent="submitUsername">
      <input type="text" placeholder="Enter username" v-model="username" />
      <button type="submit">Submit</button>
    </form>
    <div class="box">
      <div v-for="user in messages" :key="user.id">
        {{user.username}}: {{user.message}}
      </div>
      <form class="input-div" @submit.prevent="submitMessage">
        <input type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div> -->
  <div class="App">
    <WelcomeSite />
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';
import WelcomeSite from './components/WelcomeSite.vue';

export default {
  name: 'App',
  components: {
      WelcomeSite
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
  margin-top: 60px;
}
</style>
