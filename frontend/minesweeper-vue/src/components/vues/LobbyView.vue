<template>
  <div class="container-fluid big-fluid-container">
    <div class="container-fluid lobby-container">
      <h1 class="welcome-label row">Welcome to the Lobby!</h1>
      <hr class="w-100 mb-3"/>
      <div class="row row-cols-2">
        <PlayerReady/>
        <PlayerIcon/>
        <PlayerIcon/>
        <PlayerIcon/>
        <PlayerIcon/>
        <PlayerEmpty/>
        <Difficulty/>
      </div>
    </div>
    <hr class="bottom-line"/>
    <form v-on:submit.prevent class="lobby-game-form">
      <button v-on:click="joinLobby" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Ready?</button>
      <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
    </form>
  </div>
</template>

<script setup>
import PlayerReady from '../scraps/PlayerIconReady.vue'
import PlayerIcon from '../scraps/PlayerIcon.vue'
import PlayerEmpty from '../scraps/PlayerIconEmpty.vue'
import Difficulty from '../scraps/CurrentlySelectedDifficulty.vue'
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