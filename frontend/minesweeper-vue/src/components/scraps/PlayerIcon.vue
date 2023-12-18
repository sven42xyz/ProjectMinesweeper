<template>
  <div class="col card player-col">
    <h5 class="card-title">{{ username }}</h5>
      <hr style="width: 85%;" />
      <button class="btn btn-waiting btn-primary" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm float-start" role="status" aria-hidden="true"></span>
        <h6 class="m-0">Waiting...</h6>
      </button>
      <ColorPicker v-if="username == this.$cookies.get('session').username" v-model="colorHEX" @change="setColor" inputId="cp-hex" format="hex" class="mb-3" />
      <div v-else data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
        <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
        <!--teleport start--><!--teleport end-->
      </div>
    </div>
</template>


<script>
import SocketioService from '@/services/socketio.service.js';
import { usePlayerStore } from '@/store/player';

export default {
  props: {
    username: {
      type: String,
      default: 'Anna',
    },
    userId: {
      type: String,
    },
    roomId: {
      type: String,
    },
    color: {
        type: String,
        default: '#000000',
      }
  },

  data() {
    return {
      colorHEX: null,
    };
  },
  computed: {
    cssProps() {
        return {
            'background-color': '#' + this.color,
            'opacity': '100%'
        }
    }
  },

  created() {
    this.playerStore = usePlayerStore();
  },

  methods: {
    logColor() {
      console.log(this.colorHEX);
    },

    setColor() {
      const data = { userId: this.userId, roomId: this.roomId, color: this.colorHEX }

      this.playerStore.setColor(data);
      console.log(this.colorHEX);

      SocketioService.setPlayerColor(data, res => {
        if (res.status !== 200) {
          console.log('Error: bad request');
          return;
        }
      });
    }
  },
}
</script>


<style scoped>
    .card-header{
      width: 110%;
      transform: translate(-5%, -5%);
      padding-top: 5%;
    }

    .player-col{
      margin-top: 1.5vmin;
      margin-right: 2.5vmin;
      margin-left: 2.5vmin;
      margin-bottom: 1.5vmin;
      width: 45vmin;
      height: 12vh;
      padding: 10px;
      background-color: rgba(230, 230, 250, 0.599);
    }

.btn-waiting {
  background-color: rgb(149, 149, 197);
  border-color: rgb(85, 85, 85);
}

.btn {
  margin-top: 0vw;
  margin-left: 5%;
  width: 75%;
}

.card-title {
  width: 75%;
  margin-left: 5%;
  text-wrap: nowrap;
}

.spinner-grow {
  margin-left: 1%;
  margin-top: 2.5%;
  animation-duration: 1.5s;
}

hr {
  margin-bottom: 0.75vh;
  margin-top: 0vh;
}
</style>