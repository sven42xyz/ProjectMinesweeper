<template>
  <div class="col card player-col">
    <h5 class="card-title">{{ username }}</h5>
    <hr/>
    <button class="btn btn-light btn-ready" type="button" disabled>
      <span class="spinner-grow spinner-grow-active spinner-grow-sm float-start" role="status" aria-hidden="true"></span>
      <h6 class="m-0">Ready!</h6>
    </button>
  </div>
</template>

<script>
  export default {
    props: ['username']
  }
</script>

<style scoped>
     .player-col{
      margin-top: 1.5vh;
      margin-right: 2.5vw;
      margin-left: 2.5vw;
      margin-bottom: 1.5vh;
      width: 22.5vw;
      height: 12vh;
      padding: 10px;
      background-color: rgba(230, 230, 250, 0.599);
    }

    .btn-ready{
      background-color: rgb(24, 200, 91);
      border-color: rgb(85, 85, 85);
      color: rgb(0, 0, 0);
    }

    .btn{
      margin-top: 0vw;
      margin-left: 2.5vw;
      width: 15.5vw;
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
      margin-bottom: 0.75vh;
      margin-top: 0vh;
    }


</style>