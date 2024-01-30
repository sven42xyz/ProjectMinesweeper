<template>
  <div class="container-fluid game-fluid-container">
    <div class="row">
      <div class="col player-col">
        <div class="container-fluid player-container">
          <div class=" row loop-div" v-for="player in playerStore.getPlayers" v-bind:key="player" style="margin-top:10%" >
            <PlayerCurrent :username=player.username :score=player.score :active=player.turn :state=player.state :disabled=player.disabled :color=player.color></PlayerCurrent>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container-fluid small-floaty-container" v-if="showWon">
          <form id="Retry Form" class="small-floaty-form" v-on:submit.prevent>
            <h1 class="card-header">{{ winner }} won!</h1>
            <hr/>
            <div class>
              <button v-on:click="retry" v-if="isOwner()" class="btn btn-primary-lavender w-75" type="Submit" id="RedoGame" aria-expanded="false" style="margin-top: 2vmin; margin-left: 0;">Retry</button>
            </div>
          </form>
        </div>
        <div class="container-fluid small-floaty-container" v-if="showLost">
          <form id="Retry Form" class="small-floaty-form" v-on:submit.prevent>
            <h1 class="card-header">{{ looser }} lost</h1>
            <hr/>
            <div class>
              <button v-on:click="showLost = false" class="btn btn-primary-lavender w-45" type="Submit" id="RedoGame" aria-expanded="false" style="margin-top: 2vmin; margin-left: 0;">Close</button>
              <button v-on:click="retry" v-if="isOwner()" class="btn btn-primary-lavender w-45" type="Submit" id="RedoGame" aria-expanded="false" style="margin-top: 2vmin; margin-left: 0;">Retry</button>
            </div>
          </form>
        </div>
        <div class="container-fluid game-container">
          <Field :disabled="disabled" :size="size" :gameboard=gameStore.gameBoard :userId=userId :roomId=roomId></Field>
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
  import PlayerCurrent from '../scraps/PlayerIconCurrent.vue'
  import Field from '../scraps/FieldFlex.vue'
  import Chat from '../scraps/ChatBox.vue'
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
      winner: null,
      looser: null,
      disabled: false,
      size: 5,
      showWon: false,
      showLost: false,
    };
  },

  created() {
    this.roomId = this.$cookies.get('session').roomId;
    this.userId = this.$cookies.get('session').userId;
    this.playerStore = usePlayerStore();
    this.gameStore = useGameStore();
    
    this.size = this.gameStore.gameDifficulty.substring(4) * 5;

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
    },
    'update scoreboard'(res) {
      this.playerStore.setPlayers(res);
    },
    'update gameStore'(res) {
      this.gameStore.setGame(res);
      this.lost();
      this.disable();
      if (this.gameStore.gameState === "terminated") {
        this.won();
      }
    },
    'delete game'() {
      this.leaveGame();
    },
    'restart'() {
      this.showLost = false;
      this.showWon = false;
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

    retry(){
      this.showWon = false;
      this.disabled = false;

      const data = { roomId: this.roomId }

      SocketioService.restartGame(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }
      });
    },

    won() {
      if (this.gameStore.gameState !== "terminated") {
        this.disabled = false;
        return false;
      }

      const winningPlayer = this.playerStore.getPlayers.find(player => player.state === "won");

      if (winningPlayer) {
        this.winner = winningPlayer.username;
        this.showLost = false;
        this.showWon = true;
        return true;
      }

      return false;
    },

    lost() {
      if (this.gameStore.gameState !== "terminated") {
        this.disabled = false;
        return false;
      }

      const player = this.playerStore.playerByUserId(this.userId)
      if (player.state === "lost") {
        this.looser = player.username;
        this.showLost = true;
        return true;
      }

      return false;
    },

    disable() {
      const player = this.playerStore.playerByUserId(this.userId)
      if (player.state !== "active") {
        this.disabled = true;
        return true;
      }

      this.disabled = false;
      return false;
    },

    isOwner() {
      if (!this.gameStore.gameState === "terminated") {
        return false;
      }

      const player = this.playerStore.playerByUserId(this.userId)
      if (player.userClass === "host") {
        return true;
      }

      return false;
    },

    leaveGame() {
      SocketioService.disconnect();
      this.$router.push('/');
    },

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

    .small-floaty-container{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 50%;
      align-items: center;
      height: 86.66%;
      display: flex;
      z-index: 1000;
    }

    .small-floaty-form {
      background-color: rgb(240, 240, 255);
      border-color: rgb(163, 163, 163);
      border-style:groove;
      padding-top: 1.5vh;
      padding-bottom: 0.75;
      padding-left: 1.5vw;
      padding-right: 1.5vw;
      width: 40vmin;
      height: 20vmin;
      border-radius: 10px;
      margin: auto;
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