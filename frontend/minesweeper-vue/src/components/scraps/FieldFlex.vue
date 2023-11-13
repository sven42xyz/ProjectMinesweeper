<template>
<div class="row" v-for="i in size" v-bind:key="i" >
    <div class="col" v-for="i in size" v-bind:key="i" >
        <Button class="col-btn">i</Button>
    </div>
</div>
</template>
  
  <script>
    export default {
        props: {
            size: {
                type: Number,
                default: 6
            }
        },
    };
  </script>
  
<style scoped>
  .row{padding: 0; margin: 0;}
  .col{padding: 0;  margin: 0;}
  .col-btn{ 
    width: 100%;
    aspect-ratio : 1 / 1;
   }   
</style>