<template>
  <div class="container-fluid big-fluid-container">
    <div class="container-fluid game-container">
    </div>
    <div class="container-fluid chat-container">
      <Chat/>
    </div>
    <hr class="bottom-line"/>
    <form v-on:submit.prevent class="lobby-game-form">
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script setup>
  import Chat from '../scraps/ChatBox.vue'

</script>

<script>
  import SocketioService from '../../services/socketio.service.js';

  export default {
    name: 'GameView',

    data() {
      return {
        roomId: null,
        userId: null,
        players: null,
        game: null,
      };
    },

    created() {
      this.roomId = this.$cookies.get('session').roomId;
      this.userId = this.$cookies.get('session').userId;
    },

    methods: {
      cancel() {
        const data = { roomId: this.roomId, userId: this.userId }

        SocketioService.killLobby(data, cb => {
          if (cb.status !== 200) {
            console.log('Error: bad request');
            return;
          }
        });

        this.$router.push('/');
      },

      //...
      beforeUnmount() {
        SocketioService.disconnect();
      }
    },
  }
</script>

<style scoped>
 #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    }
    

    .big-fluid-container{
      background-color: rgb(255, 255, 255);
    }

    hr{
      margin: 1%;
      margin-bottom: 5%;
    }

    .game-container{
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      padding-left: 2vw;
      padding-right: 2vw;
      padding-top: 0%;
      width: 60vw;
      height: 60vh;
      border-radius:10px;
      margin: 0;
      top: 0%;
      left: 0%;
    }
    .row{
      margin: 0;
    }
    .btn{
      margin-top: 0vw;
      margin-left: 2.5vw;
      width: 15.5vw;
    }
    .welcome-label{
      margin: 1%;
      margin-top: 2vh;
      margin-bottom: 2vh;
    }
    .bottom-line{
      margin-top: 72.5vh;
      margin-bottom: 4vh;
    }

    .btn-success{
      margin-right: 21.5vw;
      margin-left: 4.5vw;
      width: 45vw;
      height: 5.5vh;
    }
    .btn-danger{
      width: 10vw;
      height: 5.5vh;
      position: absolute;
      margin-right: 2vw;
      right: 0;
    }

    hr{
      margin-bottom: 0.75vh;
      margin-top: 0vh;
    }


</style>