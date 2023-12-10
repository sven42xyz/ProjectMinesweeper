<template>
  <div class="container-fluid big-fluid-container">
    <div class="container-fluid lobby-container">
      <h1 class="welcome-label row">Welcome to the Lobby!</h1>
      <hr class="w-100 mb-3"/>
      <div class="row row-cols-2">
        <div class="loop-div" v-for="i in 6" v-bind:key="i" >
          <div class="player" v-if="getPlayerUsername(i) != null && this.returnState(i) != true"><PlayerIcon :username=getPlayerUsername(i)></PlayerIcon></div>
          <div class="player" v-else-if="getPlayerUsername(i) != null && this.returnState(i) == true"><PlayerReady :username=getPlayerUsername(i) :color=getPlayerColor(i)></PlayerReady></div>
          <div class="player" v-else-if="getPlayerUsername(i) == null"><PlayerEmpty/></div>
        </div>

        <Difficulty class= "media" :difficulty-transfer="dif-2"/>
        <Progress  class= "media" :playercount=this.totalPlayers :playersReadyCount=this.readyPlayers />
      </div>
    </div>
    <div class="container-fluid chat-container">
      <Chat/>
    </div>
    <hr class="bottom-line"/>
    <form class="lobby-game-form">
      <button v-on:click="startGame" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Start game</button>
      <button v-on:click="playerReady" class="btn btn-success" type="Button" id="Submit-Button" aria-expanded="false">Ready?</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script setup>
  import PlayerReady from '../scraps/PlayerIconReady.vue'
  import PlayerIcon from '../scraps/PlayerIcon.vue'
  import PlayerEmpty from '../scraps/PlayerIconEmpty.vue'
  import Difficulty from '../scraps/CurrentlySelectedDifficulty.vue'
  import Progress from '../scraps/ProgressBar.vue'
  import Chat from '../scraps/ChatBox.vue'
</script>

<script>
  import SocketioService from '../../services/socketio.service.js';
  import { usePlayerStore } from '@/store/player';

  export default {
    name: 'LobbyView',

    data() {
      return {
        roomId: null,
        userId: null,
        players: null,
        playerStore: null,
        totalPlayers: null,
        readyPlayers: null,
        playerUsernames: [],
      };
    },

    created() {
      this.roomId = this.$cookies.get('session').roomId;
      this.userId = this.$cookies.get('session').userId;
      this.playerStore = usePlayerStore();
      this.totalPlayers = this.playerStore.totalPlayers;
      this.readyPlayers = this.playerStore.readyPlayers;
      this.players = this.playerStore.players;
      this.playerUsernames = this.playerStore.playerUsernames;
    },

    sockets: {
      connect() {
        console.log('Connected...');
      },
      disconnect() {
        console.log('Disconnected...');
      },
      'join lobby'(res) {
        this.playerStore.setPlayers(res);
        this.totalPlayers = this.playerStore.totalPlayers;
        this.readyPlayers = this.playerStore.readyPlayers;
        this.playerUsernames = this.playerStore.playerUsernames;
        this.players = this.playerStore.players;
        console.log(this.playerStore.players);
      },
      'player ready'(res) {
        this.playerStore.setPlayers(res);
        this.totalPlayers = this.playerStore.totalPlayers;
        this.readyPlayers = this.playerStore.readyPlayers;
        this.playerUsernames = this.playerStore.playerUsernames;
        this.players = this.playerStore.players;
        console.log(this.playerStore.players);
      },
      'delete game'() {
        //add store logic (after implementing the game store...)
        this.leaveGame();
      }  
    },

    methods: {
      cancel() {
        const data = {roomId: this.roomId, userId: this.userId}

        SocketioService.killGame(data, res => {
          if (res.status !== 200) {
            console.log('Error: bad request');
            return;
          }
        });
        SocketioService.disconnect();
        this.$router.push('/');
      },

      returnState(i){
        return this.players[i-1].ready;
      },

      getPlayerColor(i){
        return this.players[i-1].color;
      },

      leaveGame() {
        SocketioService.disconnect();
        this.$router.push('/');
      },

      startGame() {
        const data = {roomId: this.roomId, userId: this.userId}
        this.$router.push('/game/');

        SocketioService.startGame(data, res => {
          if (res.status !== 200) {
            return;
          }

          this.$cookies.set('session', res);
          this.$router.push('/game/');
        });
      },

      playerReady() {
        const data = {roomId: this.roomId, userId: this.userId}

        SocketioService.playerReady(data, res => {
          if (res.status !== 200) {
            return;
          }
        });
      },

      getPlayerUsername(i) {
        return this.playerUsernames[i - 1];
      },

      //...
      beforeUnmount() {
        SocketioService.disconnect();
      },
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
    
    @media only screen and (max-width: 1680px) and (min-height: 950px), 
    screen and (max-width: 1650px) and (min-height: 925px),
    screen and (max-width: 1600px) and (min-height: 900px),
    screen and (max-width: 1500px)
    {
      .chat-container {
            display: none;
        }
      .player{
        width:100%;
        display: flex;
      }
      .lobby-container{
        width: 100%!important;
      }
      .media{
        width: 45%!important;
      }
    }

    @media only screen and (max-width: 900x) {
      .chat-container {
        display: none;
      }
      .lobby-container{
        width: 100%!important;
      }
      .media{
        width: 45%!important;
      }
    }
    .big-fluid-container{
      background-color: rgb(255, 255, 255);
    }

    hr{
      margin: 1%;
      margin-bottom: 5%;
    }

    .loop-div{
      align-items: center;
      display: flex;
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