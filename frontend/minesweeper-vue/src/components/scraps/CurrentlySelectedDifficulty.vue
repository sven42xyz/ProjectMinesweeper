<template>
    <div class="form-group">
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-1" value="dif-1" checked v-model="difficulty">
        <label class="form-check-label" for="dif-1">Easy</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-2" value="dif-2" v-model="difficulty">
        <label class="form-check-label" for="dif-2">Medium</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-3" value="dif-3" v-model="difficulty">
        <label class="form-check-label" for="dif-3">Hard</label>
        </div>
        <div class="form-check">
        <input class="form-check-input" tabindex="-1" type="radio" name="dif" id="dif-4" value="dif-4" v-model="difficulty">
        <label class="form-check-label" for="dif-4">Insane</label>
        </div>
    </div>
</template>

<style scoped>
    .form-group{      
      margin-top: 1.5vh;
      margin-right: 2.5vw;
      margin-left: 2.5vw;
      margin-bottom: 1.5vh;
      width: 22.5vw;
      height: 12vh;
      padding-left: 1vw;
      padding-right: 6vw;
      }
    .form-check-input{
        pointer-events: none;
    }
</style>