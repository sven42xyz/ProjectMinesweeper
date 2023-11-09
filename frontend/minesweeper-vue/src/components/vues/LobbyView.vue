<template>
  <div class="container-fluid big-fluid-container">
    <div class="container-fluid lobby-container">
      <h1 class="welcome-label row">Welcome to the Lobby!</h1>
      <hr class="w-100 mb-3"/>
      <div class="row row-cols-2">
        <div class="loop-div" v-for="i in 6" v-bind:key="i">
<!--           <div v-if="players.get(i-1).state == 'NotReady'"><PlayerIcon/></div>
          <div v-else-if="players.get(i-1).state == 'Ready'"><PlayerReady/></div>
          <div v-else><PlayerEmpty/></div>  -->
          <PlayerEmpty :username=this.players[i-1]></PlayerEmpty>
        </div>
        <Difficulty :difficulty-transfer="dif-2"/>
        <Progress :playercount='4' :playersReadyCount='2'/>
      </div>
    </div>
    <div class="container-fluid chat-container">
      <Chat/>
    </div>
    <hr class="bottom-line"/>
    <form class="lobby-game-form">
      <button v-on:click="startGame" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Ready?</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script setup>
  //import PlayerReady from '../scraps/PlayerIconReady.vue'
  //import PlayerIcon from '../scraps/PlayerIcon.vue'
  import PlayerEmpty from '../scraps/PlayerIconEmpty.vue'
  import Difficulty from '../scraps/CurrentlySelectedDifficulty.vue'
  import Progress from '../scraps/ProgressBar.vue'
  import Chat from '../scraps/ChatBox.vue'
</script>

<script>
  import SocketioService from '../../services/socketio.service.js';

  export default {
    name: 'LobbyView',

    data() {
      return {
        roomId: null,
        userId: null,
        players: [],
      };
    },

    created() {
      this.roomId = this.$cookies.get('session').roomId;
      this.userId = this.$cookies.get('session').userId;
    },

    sockets: {
      connect() {
        console.log('Connected...');
      },
      disconnect() {
        console.log('Disconnected...');
      },
      'join lobby'(userId) {
        this.players.push(userId);
        console.log(this.players);
      },      
    },

    methods: {
      cancel() {
        const data = {roomId: this.roomId, userId: this.userId}

        SocketioService.killLobby(data, res => {
          if (res.status !== 200) {
            console.log('Error: bad request');
            return;
          }
        });

        this.$router.push('/');
      },

      startGame() {
        const data = {roomId: this.roomId, userId: this.userId}

        SocketioService.startGame(data, res => {
          if (res.status !== 200) {
            return;
          }

/*           this.$cookies.set('session', res); */
          this.$router.push('/game/');
        });
      },

      //...
      beforeUnmount() {
        SocketioService.disconnect();
      },

      getPlayers() {
        const data = {roomId: this.roomId}

        console.log("test");

        SocketioService.getPlayers(data, res => {
          if (res.status !== 200) {
            console.log(res.data);
            this.players.push(res.data.players);
          }
        })
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

    .lobby-container{
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
    }

    hr{
      margin-bottom: 0.75vh;
      margin-top: 0vh;
    }


</style>