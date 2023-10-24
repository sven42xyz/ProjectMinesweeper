<template>
    <div class="App">
        <form @submit.prevent="submitUsername">
        <input type="text" placeholder="Enter username" v-model="username" />
        <button class="btn btn-secondary" type="Submit" id="Submit-Button" aria-expanded="false" >Submit</button>
        </form>
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