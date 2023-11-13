<template>
<div class="row" v-for="i in size" v-bind:key="i" >
    <div class="col" v-for="x in size" v-bind:key="x" >
        <Button class="col-btn" v-on:click ="clicked()"><h7>.</h7></Button>
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

        methods: {
/*             setActive(index) {
                this.activeButton = index + 1;
            },
            btnBlue() {
                this.color = '#039BE5';
            },
            btnYellow() {
                this.color = '#f3b808';
            } */
            clicked(){
                this.background = '#f3b808';
            }
        }
    };
/*     function createBoard(row, col){
        var a = []
        for(var i=0; i < row; i++){
            a[i] = []
            for(var j=0; j < col; j++){
                a[i][j] = null
            }
        } return a
    } */
</script>
  
<style scoped>
  .row{padding: 0; margin: 0;}
  .col{padding: 0;  margin: 0;}
  .col-btn{ 
    width: 100%;
    aspect-ratio : 1 / 1;
   }   
   .h7{
    color: transparent;
   }

   .white {
       background-color: white;
   }
   .blue {
       background-color: blue;
   }
</style>