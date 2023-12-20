<template>
  <div class="container-fluid game-fluid-container">
    <div class="row">
      <div class="col player-col">
        <div class="container-fluid player-container">
          <div class=" row loop-div" v-for="i in players" v-bind:key="i" style="margin-top:10%" >
            <PlayerCurrent :username=getPlayerUsername(i) :score=i.score :active="i.turn" :disabled="i.disabled" :color=getPlayerColor(i)></PlayerCurrent>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container-fluid game-container">
          <Field :size="size"></Field>
        </div>
      </div>
      <div class="col-4 chat-col">
        <div class="container-fluid chat-container">
          <Chat/>
        </div>
      </div>
    </div>
    <hr style="margin-top: 2.5vmin;"/>
    <form v-on:submit.prevent class="lobby-game-form" style="position:absolute; bottom: 2vmin; right: 2vmin">
      <div class="col">
        <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import Chat from '../scraps/ChatBox.vue'
  import PlayerCurrent from '../scraps/PlayerIconCurrent.vue'
  import Field from '../scraps/FieldFlex.vue'
</script>

<script>
import SocketioService from '../../services/socketio.service.js';
import { usePlayerStore } from '@/store/player';
import { useGameStore } from '@/store/game';

export default {
  name: 'LobbyView',

  data() {
    return {
      roomId: null,
      userId: null,
      size: 20,
      playerUsernames: [],
      players: null
    };
  },

  created() {
    this.roomId = this.$cookies.get('session').roomId;
    this.userId = this.$cookies.get('session').userId;
    this.playerStore = usePlayerStore();
    this.gameStore = useGameStore();

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
    'join lobby'(userId) {
      this.players.push(userId);
      console.log(this.players);
    },      
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

    getPlayer(i){
      return this.players[i-1];
    },

    getPlayerColor(i) {
      console.log(i);
      console.log(this.playerStore.readyPlayers);
      return this.playerStore.playerColors[i - 1];
    },
    getPlayerUsername(i) {
        return this.playerStore.playerUsernames[i - 1];
    },

    getPlayerColor(i) {
      return this.playerStore.playerColors[i - 1];
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

    @media only screen and (max-aspect-ratio: 5/3)
    {
        .chat-col {
            display: none;
        }
    }
    @media only screen and (max-width: 1100px) {
        .player-col {
            display: none!important;
        }
    }
  
    .game-container{
      margin: 2vmin;
      width: 70vmin;
      height: 70vmin;
      aspect-ratio : 1 / 1;
      padding: 0%;
    }
    .row{
      margin: 0;
    }
    .btn{
      margin-top: 0vw;
      margin-left: 2.5vmin;
      width: 15.5vmin;
    }

    .btn-danger{
      margin: 0;
      width: 10vw;
      height: 5.5vh;
      position:inherit;
    }

    hr{
      margin-bottom: 0.75vh;
      margin-top: 0vh;
    }

    .row{padding: 0; margin: 0;}
    .col{
      padding: 0;  margin: 0;
      display: flex;
      justify-content: space-around;
    }
    .player-col{
      width: 30vmin;
      flex: none;
    }
    .chat-col{
      width: 50vmin;
      flex: none;
    }

</style>