<template>
  <div class="col card player-col">
    <h5 class="card-title">{{ username }}</h5>
    <hr style="width: 85%;"/>
    <button class="btn btn-light btn-ready" type="button" disabled>
      <span class="spinner-grow spinner-grow-active spinner-grow-sm float-start" role="status" aria-hidden="true"></span>
      <h6 class="m-0">Ready!</h6>
    </button>
    <div data-v-7bbc1d28="" class="p-colorpicker p-component p-colorpicker-overlay mb-3" data-pc-name="colorpicker" data-pc-section="root" inputid="cp-hex">
      <input type="text" class="p-colorpicker-preview p-inputtext p-disabled" readonly="" disabled="" data-pc-section="input" :style="cssProps">
      <!--teleport start--><!--teleport end-->
    </div>
  </div>
</template>

<script>

export default{
    props:{
      username: {
        type: Text,
        default: 'Anna',
      },
      color: {
        type: Text,
        default: '#000000',
      }
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
      margin-top: 1.5vmin;
      margin-right: 2.5vmin;
      margin-left: 2.5vmin;
      margin-bottom: 1.5vmin;
      width: 45vmin;
      height: 12.5vmin;
      padding: 1vmin;
      background-color: rgba(230, 230, 250, 0.599);
      
    }

    .btn-ready{
      background-color: rgb(24, 200, 91);
      border-color: rgb(85, 85, 85);
      color: rgb(0, 0, 0);

    }

    .btn{
      margin-top: 0vw;
      margin-left: 5%;
      width: 75%;
    }
    .card-title{
      width: 75%;
      margin-left: 5%;
      text-wrap: nowrap;
      margin-bottom: 1vmin!important;
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

    hr{
      margin-bottom: 0.75vmin;
      margin-top: 0vh;
    }


</style>