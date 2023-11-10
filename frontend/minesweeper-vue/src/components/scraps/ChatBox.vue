<template>
    <div class="row d-flex">
      <div class="col-md-8 col-lg-6 col-xl-4" style="padding: 0">
        <div class="card" id="chat1" style="border-radius: 15px; height: 70vh; width: 27.5vw;">
          <div
            class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
            style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
            <i class="fas fa-angle-left"></i>
            <p class="mb-0 fw-bold header">Live chat</p>
            <i class="fas fa-times"></i>
          </div>
          <div class="card-body">

          <div v-for="user in messages" :key="user.id">
            {{user.name}}: {{user.message}}
          </div>
            <!-- <div class="d-flex flex-row justify-content-start mb-2">
              <div class="p-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                <p class="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video
                  below.</p>
              </div>
            </div>

            <div class="d-flex flex-row justify-content-end mb-2">
              <div class="p-3 border " style="border-radius: 15px; background-color: #fbfbfb;">
                <p class="small mb-0">Thank you, I really like your product.</p>
              </div>
            </div>


            <div class="d-flex flex-row justify-content-start mb-2">
              <div class="p-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                <p class="small mb-0">...</p>
              </div>
            </div> -->

            <div class="form-outline" style="position: absolute; bottom: 0; width: 25vw; height: 10vh; padding-bottom: 2vh;">
              <form class="input-div" @submit.prevent="submitMessage">
                <input type="textarea" class="form-cntrol" id="textAreaChat" rows="4" placeholder="Type in text" v-model="inputMessageText"/>
                <button type="submit">Submit</button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import SocketioService from '../../services/socketio.service.js';


  export default {
    created() {
      this.roomId = this.$cookies.get('session').roomId;
      this.userId = this.$cookies.get('session').userId;
      this.id     = this.$cookies.get('session').userId;
    },

    data() {
      return {
        inputMessageText: '',
        messages: [],
      };
      
  },

  sockets: {
    connect() {
      console.log('Connected...');
    },
    disconnect() {
      console.log('Disconnected...');
    },
  },

  methods: {
    submitMessage() {
      const CHAT_ROOM = this.roomId;
      const message = this.inputMessageText;
        const SENDER = {
          id: this.userId,
          name: this.userId,
        };
        SocketioService.sendMessage({ message, roomName: CHAT_ROOM }, (cb) => {
          // callback is acknowledgement from server
          console.log(cb);
          this.messages.push({
            message,
            ...SENDER,
          });
          // clear the input after the message is sent
          this.inputMessageText = "";
      });
      console.log(this.messages);
    }
  },
  beforeUnmount() {
      SocketioService.disconnect();
    }
  }
/*   function submitOnEnter(event) {
      if (event.which === 13) {
          if (!event.repeat) {
              const newEvent = new Event("submit", {cancelable: true});
              event.target.form.dispatchEvent(newEvent);
          }

          event.preventDefault(); // Prevents the addition of a new line in the text field
      }
  } */
</script>

<style scoped>
.header{
  font-size: calc(0.9vh + 0.9vw);
}
p{
  font-size: calc(0.66vh + 0.66vw);
}
.p-3{
  padding-top: 1.5vh!important;
  padding-bottom: 1.5vh!important;
  padding: 1vw!important;
  padding: 1vw!important;
}
.form-control{
  position: absolute; width: 25vw; height: 10vh; bottom: 0; margin-bottom: 2vh;
}
</style>