<template>
  <div class="col card player-col">
    <h5 class="card-title">Sven</h5>
    <hr/>
    <button class="btn btn-light btn-ready" type="button" disabled>
      <span class="spinner-grow spinner-grow-active spinner-grow-sm float-start" role="status" aria-hidden="true"></span>
      <h6 class="m-0">Ready!</h6>
    </button>
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

      if (!this.validateInput()) {
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

    .form-control{
      width:50%;
    }

    .card-header{
      width: 110%;
      transform: translate(-5%, -5%);
      padding-top: 5%;
    }

    .Center{
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
    }

    .text-center{
      padding: 2.5%;
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
    .player-col{
      margin-top: 1.5vh;
      margin-right: 2.5vw;
      margin-left: 2.5vw;
      margin-bottom: 1.5vh;
      width: 22.5vw;
      height: 12vh;
      padding: 10px;
      background-color: rgba(230, 230, 250, 0.599);
    }

    .btn-ready{
      background-color: rgb(24, 200, 91);
      border-color: rgb(85, 85, 85);
      color: rgb(0, 0, 0);
    }

    .btn-waiting{
      background-color: rgb(149, 149, 197);
      border-color: rgb(85, 85, 85);
    }

    .btn{
      margin-top: 0vw;
      margin-left: 2.5vw;
      width: 15.5vw;
    }

    .player-col-empty{
      background-color: transparent;
    }

    .spinner-grow-active{
      color: rgb(116, 255, 123);
      animation-play-state: paused;
    }

    .spinner-grow{
      margin-left: 0;
      margin-top: 1%;
      animation-duration: 1.5s;
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
    }
    .btn-danger{
      width: 10vw;
    }

    hr{
      margin-bottom: 0.75vh;
      margin-top: 0vh;
    }


</style>