<template>
  <div class="col card player-col">
    <h7 class="card-title">{{ username }}<span class="spinner-grow spinner-grow-active spinner-grow-sm float-start" role="status" aria-hidden="true"></span></h7>
  </div>
</template>

<script>
  export default {
    props: ['username'],
  };
</script>

<style scoped>
    .player-col{
      height: 5.5vh;
      padding: 10px;
      background-color: rgba(230, 230, 250, 0.599);
    }

    .row{
      width: 10vw;
    }

    .spinner-grow{
      margin-left: 0;
      margin-top: 1%;
      animation-duration: 1.5s;
    }
</style>