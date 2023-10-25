<template>
  <div class="d-flex justify-content-md-center">
    <div class="card text-bg-primary" style="width: 36rem;">
      <div class="card-body">
        <h1 class="card-header mb-4">Minesweeper.io</h1>
        <form v-on:submit.prevent>
          <div class="d-flex justify-content-center">
            <div class="input-group md-4 w-75 mb-3">
              <span class="input-group-text" id="basic-addon1">username</span>
              <input type="text" class="form-control" aria-label="Username" v-model="username">
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="text-center w-25">
              <button v-on:click="newGame" class="btn btn-danger mb-1" type="Submit" id="new-game"
                aria-expanded="false">New
                Game</button>
              <button v-on:click="joinGame" class="btn btn-warning mt-1" type="Submit" id="join-game"
                aria-expanded="false">Join
                Game</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from '../../services/socketio.service.js';

export default {
  name: 'LandingPage',
  components: {

  },

  data() {
    return {
      username: '',
    };
  },

  methods: {
    validateInput() {
      const regex = /^[a-zA-Z0-9]+$/;

      if (!this.username) {
        //add error handling -> user input needed
        return;
      }

      if (!regex.test(this.username)) {
        return;
      }

      return true;
    },

    newGame() {
      console.log(this.username);

      console.log(!this.validateInput());

      if (!this.validateInput()) {
        console.log("hello");
        return;
      }

      SocketioService.setupSocketConnection(this.username);
    },

    joinGame() {
      console.log(this.username);

      if (!this.validateInput()) {
        return;
      }

      SocketioService.setupSocketConnection(this.username);
    },

    /*     //not in use
        beforeUnmount() {
          SocketioService.disconnect();
        } */
  }
}
</script>

<style scoped></style>