<template>
  <div class="col card player-col">
    <div class="spinner-grow spinner-grow-active spinner-grow-sm float-start" role="status" aria-hidden="true"></div>
    <h7 class="card-title">{{ username }}</h7>
    <div class="score">{{ score }}</div>
  </div>
</template>

<script>
  export default {
    props: {
            username: {
                type: String,
            },
            score: {
                type: Number,
                default: 0,
            },
            active: {
                type: Boolean,
                default: true,
            }
        },
  };
</script>

<style scoped>
    .player-col{
      height: 5.5vh;
      padding: 10px;
      background-color: rgba(230, 230, 250, 0.599);
      flex-wrap: wrap;
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
      text-align: center;
      text-indent: 20%;
      padding-top: 4%;
      width: 40%;
    }
    .score{
      text-align: center;
      text-indent: 20%;
      padding-top: 4%;
      width: 40%;
    }
</style>