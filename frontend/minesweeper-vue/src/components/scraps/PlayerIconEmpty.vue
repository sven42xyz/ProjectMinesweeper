<template>
  <div class="col card player-col player-col-empty">
    <h5 class="card-title">Waiting for player...{{username}}</h5>
  </div>
</template>

<script>
  export default {
    props: ['username']
  }
</script>

<style scoped>
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

    .player-col-empty{
      background-color: transparent;
    }
    
</style>