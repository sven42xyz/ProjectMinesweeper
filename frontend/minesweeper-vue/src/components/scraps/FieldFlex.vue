<template>
<div class="row" v-for="i in size" v-bind:key="i" >
    <div class="col" v-for="x in size" v-bind:key="x" >
        <button class="col-btn" style="background: getColor([i, x])" v-on:click ="clicked(i,x)"><h7>.</h7></button>
    </div>
</div>
</template>
  
  <script>
    import Button from ".//Button.js";

    export default {

        props: {
            size: {
                type: Number,
                default: 6
            }
        },

        data(){
            return{
                gameboard : createBoard(this.size, this.size),
            }
        },
        computed:{
            getColor(row, col){
                console.log(this.gameboard[row-1][col-1].getIsRevealed());
                if(this.gameboard[row-1][col-1].getIsRevealed() == true){
                    return "black";
                }else return "white"

            }
        },

        methods: {
            clicked(row, col){
                this.gameboard[row-1][col-1].setIsRevealed();
                console.log(this.gameboard[row-1][col-1])
                console.log(this.gameboard)
                console.log(this.gameboard[row-1])
            }
        }
    };
    function createBoard(row, col){
        var a = []
        for(var i=0; i < row; i++){
            a[i] = []
            for(var j=0; j < col; j++){
                a[i][j] = new Button();
            }
        } return a
    } 
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
   .isRevealed{
        background-color: red;
   }
</style>