<template>
  <div id = "WelcomeDiv">
    <div class="container-fluid small-fluid-container">
      <div class="text-center">
        <form id="WelcomeForm" class="small-center-form" v-on:submit.prevent>
          <h1 class="card-header">Minesweeper.io</h1>
          <hr/>
          <div class="input-group mt-1">
              <span class="input-group-text" id="basic-addon1">username</span>
              <input type="text" class="form-control" aria-label="Username" v-model="username">
          </div>
          <div class>
              <button v-on:click="newGame" class="btn btn-primary-lavender w-75" type="Submit" id="new-game"
                aria-expanded="false">New
                Game</button>
           </div>
           <div class>
            <button v-on:click="joinGame" class="btn btn-secondary-yellow w-75" type="Submit" id="join-game"
                aria-expanded="false">Join
                Game</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from '../../services/socketio.service.js';

//https://getbootstrap.com/docs/5.0/components/popovers/

export default {
  name: 'LandingPage',

  data() {
    return {
      username: '',
      intent: '',
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
      this.intent = 'create'
      const data = {username: this.username, intent: this.intent};

      console.log(data);

      if (!this.validateInput()) {
        return;
      }

      const route = SocketioService.setupSocketConnection(data);

      this.$router.push('/' + route);
      
    },

    joinGame() {
      console.log(this.username);

      if (!this.validateInput()) {
        return;
      }

      this.$router.push('/join');
    },

    /*     //not in use
        beforeUnmount() {
          SocketioService.disconnect();
        } */
  }
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
    

    .input-group{
      padding-left: 0%;
      top: 0%;
      left: 26%;
      width: 100%;
      transform: translate(-25%, -25%);
      
    }

    .form-control{
      width:50%;
    }

    .card-header{
      width: 110%;
      transform: translate(-5%, -5%);
      padding-top: 5%;
    }

    .WelcomeDiv{
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
    }

    .text-center{
      padding: 2.5%;
    }

    hr{
      margin: 5%;
      margin-bottom: 15%;
    }

    .btn{
      margin-top: 2.5vh;
    }

    h1{
      font-size: 5.5vh;
    }

</style>