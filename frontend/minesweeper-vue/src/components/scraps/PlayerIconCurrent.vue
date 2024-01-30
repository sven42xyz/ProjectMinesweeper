<template>
  <div v-if="active == true && disabled == false  && state != 'lost'" class="col card player-col">
    <div data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
      <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
      <!--teleport start--><!--teleport end-->
    </div>
    <h7 class="card-title">{{ username }}</h7>
    <h7 class="score">{{ score }}</h7>
  </div>
  <div v-else-if="active == false && disabled == false  && state != 'lost'" class="col card player-col no-turn">
    <div data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
      <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
      <!--teleport start--><!--teleport end-->
    </div>
    <h7 class="card-title no-turn">{{username}}</h7>
    <h7 class="score">{{ score }}</h7>
  </div>
  <div v-else-if="disabled == true && state != 'lost'" class="col card player-col disabled">
    <div data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
      <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
      <!--teleport start--><!--teleport end-->
    </div>
    <h7 class="card-title">{{username}}</h7>
    <h7 class="score">{{ score }}</h7>
  </div>
  <div v-else-if="state == 'lost'" class="col card player-col lost">
    <div data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
      <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
      <!--teleport start--><!--teleport end-->
    </div>
    <h7 class="card-title">{{username}}</h7>
    <h7 class="score">{{ score }}</h7>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
          type: String,
          default: "Anna"
      },
      score: {
          type: Number,
          default: 42,
      },
      active: {
          type: Boolean,
          default: true,
      },
      disabled: {
          type: Boolean,
          default: false,
      },     
      state: {
          type: String,
          default: 'lost',
      },
      color: {
        type: String,
        default: 'rgb(255, 0, 0)',
      },
    },
    data(){
        return{
            fixedcolor: this.color,
        }
    },
    computed: {
      cssProps() {
          return {
              'background-color': '#' + this.color,
              'opacity': '100%'
          }
      }
  }
}
</script>

<style scoped>
    .player-col{
      height: 5.5vh;
      padding: 10px;
      background-color: rgba(65, 255, 131, 0.599);
      flex-wrap: wrap;
      
    }

    .no-turn{
      background-color: rgba(230, 230, 250, 0.599);
    }

    .disabled{
      background-color: rgba(146, 146, 146, 0.599);
      color: grey;
    }    
    .lost{
      background-color: rgba(49, 49, 49, 0.599);
      color: rgb(62, 62, 62);
    }

    .p-colorpicker-preview{
      width: 4vmin;
      height: 4vmin
    }
    .p-colorpicker{
      padding-left: 1vmin;
      padding-right: 1vmin;
    }
    .p-colorpicker-overlay{
      position: unset;
    }

    .row{
      width: 10vw;
    }

    .spinner-grow{
      margin-left: 10%;
      margin-top: 2%;
      animation-duration: 1.5s;
    }
    h7{
      text-align: left;
      text-indent: 20%;
      padding-top: 4%;
      width: 40%;
    }
    .score{
      text-align: center;
      text-indent: 20%;
      padding-top: 4%;
      width: 40%;
      margin-bottom: var(--bs-card-title-spacer-y);
    }
</style>