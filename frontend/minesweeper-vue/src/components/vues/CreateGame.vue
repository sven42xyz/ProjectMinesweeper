<template>
  <div class="container-fluid medium-fluid-container">
    <h1 class="card-header mt-2 mb-2">Create Game</h1>
    <hr style="margin-left: 2vw; margin-right: 2vw;"/>
    <form v-on:submit.prevent class="create-game-form">
      <div class="row row-cols-1">
        <div class="col mb-2">
          <div class="input-group" style="height: 5.5vh; width: 100%;">
            <h6 class="input-group-text" id="basic-addon1" style="text-align:left; display:inline-flex;">your room</h6>
            <h6 class="form-control" style="text-align:center; align-items: center; display: inline-flex;">{{ roomId }}</h6>
          </div>
        </div>
        <div class="col">
          <div class="d-flex justify-content-md-left">
            <form v-on:submit.prevent>
              <div class="form-group">
                <h5>Choose difficulty:</h5>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-1" value="dif-1" checked v-model="difficulty">
                  <h7 class="form-check-label" for="dif-1">Easy</h7>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-2" value="dif-2" v-model="difficulty">
                  <h7 class="form-check-label" for="dif-2">Medium</h7>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-3" value="dif-3" v-model="difficulty">
                  <h7 class="form-check-label" for="dif-3">Hard</h7>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-4" value="dif-4" v-model="difficulty">
                  <h7 class="form-check-label" for="dif-4">Insane</h7>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr class="m-1 bottom" style="width: 100%;"/>
      <button v-on:click="createGame" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Create Game</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script>
import SocketioService from '@/services/socketio.service.js';
import { usePlayerStore } from '@/store/player';
import { useGameStore } from '@/store/game';

export default {
  name: 'CreateGame',

  setup() {
    const playerStore = usePlayerStore();
    const gameStore = useGameStore();
    return { playerStore, gameStore };
  },

  data() {
    return {
      roomId: null,
      userId: null,
      difficulty: 'dif-1',
    };
  },

  created() {
    this.roomId = this.$cookies.get('session').roomId;
    this.userId = this.$cookies.get('session').userId;
  },

  sockets: {
    'delete game'() {
      this.leaveGame();
    },
  },

  methods: {
    createGame() {
      const data = {roomId: this.roomId, userId: this.userId, difficulty: this.difficulty};

      SocketioService.setGameOptions(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }

        this.playerStore.setPlayers(res.players);
        this.gameStore.setGame(res.game);

        this.$router.push('/lobby/');
      });
    },

    cancel() {
      const data = {roomId: this.roomId, userId: this.userId}

      SocketioService.killGame(data, cb => {
        if (cb.status !== 200) {
          console.log('Error: bad request');
          return;
        }
      });
      SocketioService.disconnect();
      this.$router.push('/');
    },

    leaveGame() {
      SocketioService.disconnect();
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
.input-group{
  width: 75%;
  padding-left: 2vmin;
  height: 12.5%;
  margin-bottom: 1vmin;
  flex-wrap: nowrap;
}

.input-group-text{
  height: 100%;
  width: 37.5%;
  padding: calc(0.5vh + 0.5vw);
}
.form-group{      
  margin: 0;
  width: 50vmin;
  height: 12vmin;
  padding-left: 2vmin;
  padding-right: 6vmin;
  text-align: left;
  }
.form-check-input{
    height: calc(0.75vh + 0.75vw);
    width: calc(0.75vh + 0.75vw);
}

.form-check{
  height: calc(1vh + 1vw);
  min-height: 0;
}

.form-control{
  height: 100%;
  width: 35%;
  padding: calc(0.5vh + 0.5vw);
}

.btn-success{
  margin-right: 10.5vmin;
  margin-top: 3vmin;
  margin-left: 4vmin;
  width: 21vmin;
  position: absolute;
  left: 2vmin;
}

hr{
  margin-top: 5%;
  margin-bottom: 4vh;
}

hr.bottom{
  margin-top: 4vmin!important;
  margin-left: 2vmin!important;
  width: 97%!important;
}

.btn-danger{
  position: absolute;
  margin-top: 3vmin!important;
  width: 21vmin;
  right: 2.5vmin;
}

.create-game-form{
  padding: 1%;
  margin-left: 2%;
  width: 92.5%;
  height: 30vh;
  max-height: 20vw;

}

</style>