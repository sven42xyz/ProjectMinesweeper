<template>
  <div id = "Center">
    <div class="container-fluid big-fluid-container">

    </div>
  </div>
</template>

<script>
import SocketioService from '../../services/socketio.service.js';

//https://getbootstrap.com/docs/5.0/components/popovers/

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

    .Center{
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

</style>