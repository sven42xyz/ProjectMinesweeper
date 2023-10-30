<template>
  <div class="container-fluid medium-fluid-container">
    <h1 class="card-header mt-2 mb-2">Create Game</h1>
    <hr style="margin-left: 2vw; margin-right: 2vw;"/>
    <form v-on:submit.prevent class="create-game-form">
      <div class="row row-cols-1">
        <div class="col mb-2" style="padding-right: 0%;">
          <div class="input-group md-4 mb-3" style="height: 5.5vh; width: 100%;">
            <span class="input-group-text" id="basic-addon1" style="font-size: 2vh; ">your room</span>
              <span class="form-control" style="height: 5.5vh;">{{ roomId }}</span>
          </div>
        </div>
        <div class="col">
          <div class="d-flex justify-content-md-left mb-3">
            <form v-on:submit.prevent>
              <div class="form-group">
                <h5 style="font-size: 2.5vh;">Choose difficulty:</h5>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-1" value="dif-1" checked v-model="difficulty">
                  <label class="form-check-label" for="dif-1">Easy</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-2" value="dif-2" v-model="difficulty">
                  <label class="form-check-label" for="dif-2">Medium</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-3" value="dif-3" v-model="difficulty">
                  <label class="form-check-label" for="dif-3">Hard</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-4" value="dif-4" v-model="difficulty">
                  <label class="form-check-label" for="dif-4">Insane</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr class="m-0"/>
      <button v-on:click="createGame" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Create Game</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script>
import SocketioService from '../../services/socketio.service.js';

export default {
  name: 'CreateGame',

  data() {
    return {
      roomId: null,
      userId: null,
      difficulty: 'dif-1',
    };
  },

  created() {
    this.roomId = this.$route.params.roomId;
    this.userId = this.$route.params.userId;
  },

  methods: {
    createGame() {
      const data = {roomId: this.roomId, userId: this.userId, difficulty: this.difficulty};
      console.log(data);

      SocketioService.setGameOptions(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }

        this.$router.push('/lobby/' + res.roomId + '/u/' + res.userId);
      });
    },

    //Go back to the beginning
    cancel() {
      //todo: determine if the kill comes from host or player
      const userClass = 'host'

      const data = {roomId: this.roomId, userClass: userClass}
      console.log(data);

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
.form-check-label {
  text-align: left;
  display: block;
  padding-top: 0.25vh;
  font-size: 2vh;
}

.form-check-input{
  height: 2.25vh;
  width: 2.25vh;
}
.form-check{
  min-height: 2.25vh;
  min-width: 2.25vh;
}

.btn-success{
  margin-right: 10.5vw;
}

.create-game-form{
  padding: 5%;
  padding-top: 1%;
  width: 40vw;

}

</style>