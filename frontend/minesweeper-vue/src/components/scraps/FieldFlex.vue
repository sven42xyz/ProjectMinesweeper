<template>
    <div class="row" v-for="i in size" v-bind:key="i" >
        <div class="col" v-for="x in size" v-bind:key="x" >
            <FButton :ref="ref(i,x)" class="col-btn" v-on:click ="clicked(i,x)"><h7>.</h7></FButton>
        </div>
    </div>
</template>
  
<script setup>
  import FButton from './FieldButton.vue';
</script>

  <script>
    import Button from './/Button.js';

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
        methods:{
            clicked(row, col){
                console.log(this.gameboard[row-1]);
                console.log(this.$refs);
                this.gameboard[row-1][col-1].setIsRevealed();
                for(const [key, value] of Object.entries(this.$refs)){
                    if(key == ("["+ row + "," + col + "]")){
                        value[0].color = 'grey';
                        value[0].enabled = 'none';

                        if(this.gameboard[row-1][col-1].IsBomb){
                            value[0].isBomb = 'X';
                        }
                    }
                }
            },
            ref(i, x) {
                return("["+ i + "," + x + "]");
            },
        },
        computed:{
        },

    };
    function createBoard(row, col){
        var a = []
        var bombs = (row + col) * 0.75;
        for(var i = 0; i < row; i++){
            a[i] = []
            for(var j=0; j < col; j++){
                a[i][j] = new Button();
            }
        }
        for (i = 0; i < bombs; i++) {
            //Get random position for the next bomb
            var w = Math.floor(Math.random()* col);
            var h = Math.floor(Math.random() * row);
            while(a[w][h].isBomb) { //if this position is a bomb
                //we get new position
                w = Math.floor(Math.random()* col);
                h = Math.floor(Math.random() * row);
            }
            console.log(a[w][h]);
            a[w][h].IsBomb = true; //make new position is a bomb
        }
        return a
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