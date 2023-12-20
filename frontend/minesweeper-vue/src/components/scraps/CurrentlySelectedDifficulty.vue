<template>
    <div class="form-group">
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-1" value="dif-1" checked v-model="difficulty">
        <h7 class="form-check-label" for="dif-1">Easy</h7>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-2" value="dif-2" v-model="difficulty">
        <h7 class="form-check-label" for="dif-2">Medium</h7>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-3" value="dif-3" v-model="difficulty">
        <h7 class="form-check-label" for="dif-3">Hard</h7>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-4" value="dif-4" v-model="difficulty">
        <h7 class="form-check-label" for="dif-4">Insane</h7>
        </div>
    </div>
</template>

<script>
export default {
  props:{
    difficultyTransfer: {
      type: String,
      default: 'dif-1',
    }
  },

  data() {
    return {
      difficulty: this.difficultyTransfer,
    };
  },
}
</script>

<style scoped>
    .form-group{      
      margin-top: 1.5vh;
      margin-right: 2.5vmin;
      margin-left: 2.5vw;
      margin-bottom: 1.5vh;
      width: 22.5vw;
      height: 12vh;
      padding-left: 1vw;
      padding-right: 6vw;
      }
    .form-check-input{
        pointer-events: none;
        height: calc(0.75vh + 0.75vw);
        width: calc(0.75vh + 0.75vw);
    }

    .form-check{
      height: calc(1vh + 1vw);
      min-height: 0;
      text-align: left;
      padding-left: 2.5vmin;
    }

</style>