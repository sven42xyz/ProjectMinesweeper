<template>
  <div class="container-fluid join-fluid-container">
    <h1 class="card-header mt-2 mb-2">Join Game</h1>
    <hr style="margin-left: 2vw; margin-right: 2vw;"/>
    <form v-on:submit.prevent class="join-game-form">
      <div class="d-flex justify-content-center">
        <div class="input-group md-4 w-100 mb-2 mt-2">
          <span class="input-group-text" id="basic-addon1">room</span>
          <input type="text" class="form-control" aria-label="Roomcode" v-model="room">
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
export default {
  name: 'JoinGame',
  props: {
  }
}
</script>

<style scoped>

.join-game-form{
  padding: 5%;
  padding-top: 1%;
  width: 31vw;
}
.btn-success{
  margin-right: 5.5vw;
}
</style>
