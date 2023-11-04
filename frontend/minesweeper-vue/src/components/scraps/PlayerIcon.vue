<template>
  <div class="col card player-col">
    <h5 class="card-title">{{ userID }}</h5>
    <hr/>
    <button class="btn btn-waiting btn-primary" type="button" disabled>
      <span class="spinner-grow spinner-grow-sm float-start" role="status" aria-hidden="true"></span>
      <h6 class="m-0">Waiting...</h6>
    </button>
  </div>
</template>

<script>

</script>

<style scoped>
    .card-header{
      width: 110%;
      transform: translate(-5%, -5%);
      padding-top: 5%;
    }

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

    .btn-waiting{
      background-color: rgb(149, 149, 197);
      border-color: rgb(85, 85, 85);
    }

    .btn{
      margin-top: 0vw;
      margin-left: 2.5vw;
      width: 15.5vw;
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