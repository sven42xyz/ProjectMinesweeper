<template>
  <div class="container-fluid big-fluid-container">
    <div class="row">
      <div class="col player-col">
        <div class="container-fluid player-container">
          <div class=" row loop-div" v-for="i in players" v-bind:key="i" >
  <!--           <div v-if="players.get(i-1).state == 'NotReady'"><PlayerIcon/></div>
            <div v-else-if="players.get(i-1).state == 'Ready'"><PlayerReady/></div>
            <div v-else><PlayerEmpty/></div>  -->
            <PlayerCurrent :username=i></PlayerCurrent>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="container-fluid game-container">
          <Field :size="this.size"></Field>
        </div>
      </div>
      <div class="col-4">
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
  import Chat from '../scraps/ChatBox.vue'
  import PlayerCurrent from '../scraps/PlayerIconCurrent.vue'
  import Field from '../scraps/FieldFlex.vue'
</script>

<script>
import SocketioService from '../../services/socketio.service.js';

export default {
  name: 'LobbyView',

  data() {
    return {
      roomId: null,
      userId: null,
      size: 4,
      players: ['Anna', 'Ben','Testi', 'Marie'],
    };
  },

  created() {
    this.roomId = this.$cookies.get('session').roomId;
    this.userId = this.$cookies.get('session').userId;

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
      console.log(this.players);
    },      
  },

  methods: {
    cancel() {
      const data = {roomId: this.roomId, userId: this.userId}

      SocketioService.killLobby(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }
      });
      SocketioService.disconnect();
      this.$router.push('/');
    },

    getPlayer(i){

      return this.players[i-1];
    },

    startGame() {
      const data = {roomId: this.roomId, userId: this.userId}
      this.$router.push('/game/');

      SocketioService.startGame(data, res => {
        if (res.status !== 200) {
          return;
        }

        this.$cookies.set('session', res);
        this.$router.push('/game/');
      });
    },

    //...
    beforeUnmount() {
      SocketioService.disconnect();
    },

    getPlayers() {
      const data = {roomId: this.roomId}

      console.log("test");

      SocketioService.getPlayers(data, res => {
        if (res.status !== 200) {
          console.log(res.data);
          this.players.push(res.data.players);
        }
      })
    }
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
    

    .big-fluid-container{
      background-color: rgb(255, 255, 255);
    }

    hr{
      margin: 1%;
      margin-bottom: 5%;
    }

    .player-container{
      
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
      margin-left: 2.5vw;
      width: 15.5vw;
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
    .col{padding: 0;  margin: 0;
      display: flex;
      justify-content: space-around;
    }
    .player-col{
      width: 20vmin;
      flex: none;
    }

</style>