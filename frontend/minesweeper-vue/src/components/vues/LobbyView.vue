<template>
  <div class="container-fluid big-fluid-container">
    <div class="container-fluid lobby-container">
      <h1 class="welcome-label row">Welcome to the Lobby!</h1>
      <hr class="w-100 mb-3" />
      <div class="row row-cols-2">
        <div class="loop-div" v-for="i in 6" v-bind:key="i">
          <div class="player" v-if="getPlayerUsername(i) != null && returnState(i) != true">
            <PlayerIcon :username=getPlayerUsername(i) :userId="userId" :roomId="roomId" :color=getPlayerColor(i)>
            </PlayerIcon>
          </div>
          <div class="player" v-else-if="getPlayerUsername(i) != null && returnState(i) == true">
            <PlayerReady :username=getPlayerUsername(i) :color=getPlayerColor(i)></PlayerReady>
          </div>
          <div class="player" v-else-if="getPlayerUsername(i) == null">
            <PlayerEmpty />
          </div>
        </div>

        <Difficulty class="media" :difficulty-transfer=gameStore.gameDifficulty />
        <Progress class="media" :playercount=playerStore.totalPlayers :playersReadyCount=playerStore.readyPlayers />
      </div>
    </div>
    <div class="container-fluid chat-container">
      <Chat />
    </div>
    <hr class="bottom-line" />
    <form class="lobby-game-form" v-on:submit.prevent>
      <Toast-Toast />
      <ConfirmPopup group="headless" class="popup">
        <template #container="{ message, rejectCallback }">
          <div class="bg-gray-900 text-white border-round p-3">
            <span>{{ message.message }}</span>
            <div class="flex align-items-center gap-2 mt-3">
              <button class="btn btn-success btn-accept" label="Accept" @click="playerReady">Accept</button>
              <button class="btn btn-danger btn-cancel" label="Cancel" @click="rejectCallback">Cancel</button>
            </div>
          </div>
        </template>
      </ConfirmPopup>
      <button v-if="playerStore.playerUsernames.length <= 1" v-on:accept="playerReady"
        @click="requireConfirmation($event)" class="btn btn-success" type="Button" id="Submit-Button"
        aria-expanded="false">Ready?</button>
      <button v-else v-on:click="playerReady" class="btn btn-success" type="Button" id="Submit-Button"
        aria-expanded="false">Ready?</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button"
        aria-expanded="false">Cancel</button>
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
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = (event) => {
  confirm.require({
    target: event.currentTarget,
    group: 'headless',
    message: 'Are you sure you want to play alone?',
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  });
}

</script>

<script>
import SocketioService from '@/services/socketio.service.js';
import { usePlayerStore } from '@/store/player';
import { useGameStore } from '@/store/game';

export default {
  name: 'LobbyView',

  data() {
    return {
    };
  },

  created() {
    this.roomId = this.$cookies.get('session').roomId;
    this.userId = this.$cookies.get('session').userId;
    this.playerStore = usePlayerStore();
    this.gameStore = useGameStore();
    this.player = this.playerStore.playerByUserId(this.userId);
  },

  beforeUnmount() {
  },

  sockets: {
    connect() {
      console.log('Connected...');
    },
    disconnect() {
      console.log('Disconnected...');
    },
    'update playerStore'(res) {
      this.playerStore.setPlayers(res);
    },
    'delete game'() {
      this.leaveGame();
    },
    'enter game'() {
      this.enterGame();
    }
  },

  methods: {
    cancel() {
      const data = { roomId: this.roomId, userId: this.userId }
      for(let i = 0; i < this.playerStore.size; i++){
        console.log(this.playerStore.players[i]);
        if(this.playerStore.players[i].username == this.userId && this.playerStore.players[i].userClass == "host"){
          SocketioService.killGame(data, res => {
            if (res.status !== 200) {
              console.log('Error: bad request');
              return;
            }
          });
        }else if(this.playerStore.players[i].username == this.userId){
          //playerstore-Update
        }
      }
      SocketioService.disconnect();
      this.$router.push('/');
    },

    returnState(i) {
      return this.playerStore.players[i - 1].ready;
    },

    leaveGame() {
      SocketioService.disconnect();
      this.$router.push('/');
    },

    startGame() {
      const data = { roomId: this.roomId, userId: this.userId }

      SocketioService.startGame(data, res => {
        if (res.status !== 200) {
          return;
        }

        this.$router.push('/game/');
      });
    },

    enterGame() {
      const data = { roomId: this.roomId, userId: this.userId }

      SocketioService.enterGame(data, res => {
        if (res.status !== 200) {
          return;
        }

        this.$router.push('/game/');
      });
    },

    playerReady() {
      const data = { roomId: this.roomId, userId: this.userId }

      SocketioService.playerReady(data, res => {
        if (res.status !== 200) {
          return;
        }
      });

      this.startGame();

    },

    getPlayerUsername(i) {
      console.log(this.playerStore.players[i - 1]);
      console.log(this.$cookies.get('session'));
      return this.playerStore.playerUsernames[i - 1];
    },

    getPlayerColor(i) {
      return this.playerStore.playerColors[i - 1];
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

@media only screen and (max-aspect-ratio: 5/3) {
  .chat-container {
    display: none;
  }

  .player {
    width: 100%;
    display: flex;
  }

  .lobby-container {
    width: 100% !important;
  }

  .media {
    width: 45% !important;
  }
}

@media only screen and (max-width: 900x) {
  .chat-container {
    display: none;
  }

  .lobby-container {
    width: 100% !important;
  }

  .media {
    width: 45% !important;
  }
}

.big-fluid-container {
  background-color: rgb(255, 255, 255);
}

.btn-accept {
  color: black;
  margin-top: 0vw !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  font-size: 1.5vmin;
  height: 3.5vmin !important;
  width: 10vmin !important;
  align-self: flex-start;
}

.btn-cancel {
  color: black;
  margin-left: 0 !important;
  margin-right: 2vmin !important;
  font-size: 1.5vmin;
  height: 3.5vmin !important;
  width: 10vmin !important;
  align-self: flex-end;
}

hr {
  margin: 1%;
  margin-bottom: 5%;
}

.loop-div {
  align-items: center;
  display: flex;
  height: 90%;
}

.lobby-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 0%;
  width: 60vw;
  height: 60vh;
  border-radius: 10px;
  margin: 0;
  top: 0%;
  left: 0%;
}

.row {
  margin: 0;
}

.btn {
  margin-top: 0vw;
  margin-left: 2.5vw;
  width: 15.5vw;
}

.welcome-label {
  margin: 1%;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.bottom-line {
  margin-top: 72.5vh;
  margin-bottom: 4vh;
}

.btn-success {
  margin-right: 21.5vw;
  margin-left: 4.5vw;
  width: 45vw;
  height: 5.5vh;
}

.btn-danger {
  width: 10vw;
  height: 5.5vh;
}

hr {
  margin-bottom: 0.75vh;
  margin-top: 0vh;
}</style>