<template>
  <div class="d-flex justify-content-md-center">
    <div class="card text-bg-primary" style="width: 36rem;">
      <div class="card-body">
        <h1 class="card-header mb-4">Create Game</h1>
        <form v-on:submit.prevent>
          <div class="container">
            <div class="d-flex justify-content-center">
              <div class="row">
                <div class="col-12">
                  <div class="input-group md-4 w-100 mb-3">
                    <span class="input-group-text" id="basic-addon1">room</span>
                    <input type="text" class="form-control" aria-label="Roomcode" v-model="room">
                  </div>
                </div>
                <div class="col-12">
                  <div class="d-flex justify-content-md-left mb-3">
                    <form v-on:submit.prevent>
                      <div class="form-group">
                        <h5>Choose difficulty:</h5>
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
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <div class="text-center w-25">
              <button class="btn btn-danger mb-1" type="Submit" id="Submit-Button" aria-expanded="false">Create
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
}
</style>