<template>
  
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="App">
    <form @submit.prevent="submitUsername">
      <input type="text" placeholder="Enter username" v-model="message" />
      <button type="submit">Submit</button>
    </form>
    <div class="box">
      <div class="messages"></div>
      <form class="input-div" @submit.prevent="submitMessage">
        <input type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
  </div>
  </div>
</template>

<script>
import SocketioService from './services/socketio.service.js';

export default {
  name: 'App',
  components: {
    
  },

  /*
  created() {
    SocketioService.setupSocketConnection();
  },*/

  submitUsername() {
      console.log(this.username);
      SocketioService.setupSocketConnection(this.username);
  },
  
  beforeUnmount() {
    SocketioService.disconnect();
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
