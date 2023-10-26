<template>
  <div class="d-flex justify-content-md-center">
    <div class="card text-bg-primary" style="width: 36rem;">
      <div class="card-body">
        <h1 class="card-header mb-4">Join Game</h1>
        <form v-on:submit.prevent>
          <div class="d-flex justify-content-center">
            <div class="input-group md-4 w-75 mb-3">
              <span class="input-group-text" id="basic-addon1">room</span>
              <input type="text" class="form-control" aria-label="Roomcode" v-model="room">
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="text-center w-25">
              <button class="btn btn-danger mb-1" type="Submit" id="Submit-Button" aria-expanded="false">Join
                Game</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinGame',
  props: {
  }
}
</script>

<style scoped></style>
