<template>
  <div class="card" id="chat1" style="border-radius: 15px; height: 68vmin; width: 45vmin; right: 2vmin;">
    <div
      class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
      style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
      <i class="fas fa-angle-left"></i>
      <p class="mb-0 fw-bold header">Room #{{this.roomId}}</p>
      <i class="fas fa-times"></i>
    </div>
    <div class="card-body">

      <div v-for="user in messages" :key="user.id">
        <div v-if="this.username == user.name" class="d-flex flex-row justify-content-start mb-2">
          <div class="p-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
            <p class="small mb-0">{{user.name}}: {{user.message}}</p>
          </div>
        </div>
        <div v-else class="d-flex flex-row justify-content-end mb-2">
          <div class="p-3 border " style="border-radius: 15px; background-color: #fbfbfb;">
            <p class="small mb-0">{{user.name}}: {{user.message}}</p>
          </div>
        </div>
      </div>

      <div class="form-outline" style="position: absolute; bottom: 0; width: 95%; padding-bottom: 2vmin;">
        <form class="input-div" @submit.prevent="submitMessage" style="width: 100%;">
          <input type="textarea" class="form-control" id="textAreaChat" rows="4" placeholder="Type in text" v-model="inputMessageText"/>
          <button class="btn btn-outline-secondary" type="submit" style="width:25%; font-size: 2vmin;margin-top: 0;height: 4vmin;">Submit</button>
        </form>
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
      this.username = this.$cookies.get('session').username;
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
    'message'(msg) {
        console.log(msg);
        this.appendMessage(msg);
        var i = this.messages.length;
        console.log(i);
        while(i > 8){
          console.log("more then 2 messages");
          console.log("removing " + this.messages[0].message);
          var h = this.messages.splice(0, 1);
          console.log("removed " + h[0].message);
          i = this.messages.length
        }
     }, 
  },

  methods: {
    submitMessage() {
      const message = this.inputMessageText;
        const SENDER = {
          id: this.userId,
          name: this.username,
        };
        SocketioService.sendMessage({ message, roomName: this.roomId }, (cb) => {
          // callback is acknowledgement from server
          console.log(cb);
          this.messages.push({
            message,
            ...SENDER,
          });

          var i = this.messages.length;
          console.log(SENDER);
          while(i > 8){
            console.log("more then 2 messages");
            console.log("removing " + this.messages[0].message);
            var h = this.messages.splice(0, 1);
            console.log("removed " + h[0].message);
            i = this.messages.length
          }
          // clear the input after the message is sent
          this.inputMessageText = "";
      });
      console.log(this.messages);
    },
    appendMessage(msg){
      console.log("appended:");
        if(msg.id != this.userId){
          this.messages.push(msg);
          console.log(this.messages);
          msg = "";
        }
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
  width: 70%; height: 4vmin; bottom: 0;
}
</style>