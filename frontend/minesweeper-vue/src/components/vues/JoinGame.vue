<template>
  <div class="container-fluid join-fluid-container">
    <h1 class="card-header mt-2 mb-2">Join Game</h1>
    <hr style="margin-left: 2vw; margin-right: 2vw;"/>
    <form v-on:submit.prevent class="join-game-form">
      <div class="d-flex input-group justify-content-center" style="height: 5.5vh; width: 100%;">
        <div class="input-group md-4 w-100 mb-2 mt-2">
          <span class="input-group-text" id="basic-addon1" style="text-align:left; display:inline-flex;">room</span>
                <input type="text" class="form-control" style="text-align:center; align-items: center; display: inline-flex;" v-model="roomId">
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button v-on:click="joinLobby" class="btn btn-success" type="Submit" id="Submit-Button" aria-expanded="false">Join Game</button>
              <button v-on:click="cancel" class="btn btn-danger" type="Cancel" id="Cancel-Button" aria-expanded="false">Cancel</button>
            </div>
          </form>
        </div>
</template>


<script>
import socketioService from '@/services/socketio.service';

export default {
  name: 'JoinGame',

  data() {
    return {
      roomId: null,
      userId: null,
    };
  },

  created() {
    this.userId = this.$cookies.get('session').userId;
  },

  methods: {
    validateInput() {
      const regex = /^[a-zA-Z0-9]+$/;

      if (!this.roomId) {
        //add error handling -> user input needed
        return;
      }

      if (!regex.test(this.roomId)) {
        return;
      }

      return true;
    },

    joinLobby() {
      const data = { roomId: this.roomId, userId: this.userId };

      console.log(data);

      if (!this.validateInput()) {
        return;
      }

      socketioService.joinLobby(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }

        this.$cookies.set('session', res);
        this.$router.push('/lobby/');
      })
    },

    cancel() {
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>

.join-game-form{
  padding: 5%;
  padding-top: 1%;
  width: 31vw;
}
.input-group{
  width: 100%;
  padding-left: 0.75vmin;
  margin-top: 2vmin;
  margin-bottom: 2.5vmin;
  height: 100%;
  flex-wrap: nowrap;
}

.input-group-text{
  height: 100%;
  width: 37.5%;
  padding: calc(0.5vh + 0.5vw);
}

.form-control{
  height: 100%;
  width: 35%;
  padding: calc(0.5vh + 0.5vw);
}

.btn-success{
  margin-right: 10.5vw;
  width: 17.5vmin;
  position: absolute;
  left: 6vmin;
  margin-left: 0;
}


.btn-danger{
  position: absolute;
  right: 2.75vmin;
  width: 17.5vmin;
}

.join-game-form{
  padding: 1%;
  margin-left: 2%;
  width: 92.5%;
  height: 30vh;
  max-height: 20vw;

}
</style>
