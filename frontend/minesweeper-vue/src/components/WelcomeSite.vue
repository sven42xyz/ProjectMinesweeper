<template>
  <div id = "WelcomeDiv">
    <div class="container-fluid">
      <div class="text-center">
        <form id="WelcomeForm">
          <div class="mb-3">
            <label for="NameLabel" class="form-label">Username...</label>
            <input type="text" class="form-control" placeholder="Enter username" v-model="username" />
          </div>
          <div class="mb-3">
            <button class="btn btn-secondary" type="Submit" id="Submit-Button" aria-expanded="false" >Submit</button>
          </div>
          <div class="mb-3">
            <button class="btn btn-secondary" type="Submit" id="Submit-Button" aria-expanded="false" >Submit</button>
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
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    }
    
    .container-fluid{
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .input-group{
      padding-left: 40%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .WelcomeDiv{
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
    }

    .text-center{
      padding: 5%;
    }

    form{
      background-color: rgb(240, 240, 255);
      padding-top: 25px;
      padding-bottom: 10px;
      padding-left: 25px;
      padding-right: 25px;
      width: 300px;
      height: 300px;
      border-radius:10px;
      margin: auto;
    }
</style>