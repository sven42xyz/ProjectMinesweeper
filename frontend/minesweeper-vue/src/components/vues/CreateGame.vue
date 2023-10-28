<template>
  <div class="container-fluid medium-fluid-container">
    <h1 class="card-header mt-2 mb-2" style="font-size: 6vh;">Create Game</h1>
    <hr style="margin-left: 2vw; margin-right: 2vw;"/>
    <form v-on:submit.prevent class="create-game-form">
      <div class="row row-cols-1">
        <div class="col mb-2" style="padding-right: 0%;">
          <div class="input-group md-4 mb-3" style="height: 5.5vh; width: 100%;">
            <span class="input-group-text" id="basic-addon1" style="font-size: 2vh; ">room</span>
            <input type="text" class="form-control" aria-label="Roomcode" v-model="room"  style="height: 5.5vh;">
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
                  <input class="form-check-input" type="radio" name="dif" id="dif-1" value="dif-1" checked>
                  <label class="form-check-label" for="dif-1">Easy</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-2" value="dif-2">
                  <label class="form-check-label" for="dif-2">Medium</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-3" value="dif-3">
                  <label class="form-check-label" for="dif-3">Hard</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="dif" id="dif-4" value="dif-4">
                  <label class="form-check-label" for="dif-4">Insane</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr class="m-0"/>
      <button class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Create Game</button>
      <button class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script>
import SocketioService from '../../services/socketio.service.js';

export default {
  name: 'CreateGame',
  components: {
  },

  data() {
    return {
      room: '',
      difficulty: ''
    };
  },

  methods: {
    submitRoomCode() {
      console.log(this.room);
    },

    beforeUnmount() {
      SocketioService.disconnect();
    }
  }
}
</script>

<style scoped>
.form-check-label {
  text-align: left;
  display: block;
  padding-top: 0.25vh;
  font-size: 2vh;
}

.btn-success{
  margin-right: 10.5vw;
}
.btn{
  margin-top: 2vw;
}

.form-check-input{
  height: 2.25vh;
  width: 2.25vh;
}
.form-check{
  min-height: 2.25vh;
  min-width: 2.25vh;
}

.create-game-form{
  padding: 5%;
  padding-top: 1%;
  width: 40vw;

}
</style>