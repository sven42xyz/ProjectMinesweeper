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
                this.gameboard[row-1][col-1].setIsRevealed();
                console.log(row, col);
                console.log(this.gameboard)
                console.log(this.gameboard[row-1])
                console.log(this.gameboard[col-1])
                var color = 'grey';
                var w = row - 1;
                var h = col - 1;
                for(const [key, value] of Object.entries(this.$refs)){
                    var check = "["+ row + "," + col + "]";
                    console.log(check);
                    if(key == check){
                        value[0].color = color;
                        value[0].enabled = 'none';

                        if(this.gameboard[row-1][col-1].IsBomb){
                            value[0].isBomb = 'X';
                        }else if(this.gameboard[row-1][col-1].nBombs !=0){
                            value[0].isNumber = this.gameboard[row-1][col-1].nBombs;
                        }else{
                            this.revealNeighbours(w, h, color);
                        }
                    }
                }
            },
            revealNeighbours(row, col, color){
                const refEntries = Object.entries(this.$refs);
                for(var i = 0; i < 3; i++){
                    for(var j= 0; j < 3; j++){
                        var x = (row - 1 + i);
                        var y = (col - 1 + j);
                        if(x >= 0 && y >= 0 && x < this.size && y < this.size && this.gameboard[x][y].IsBomb){
                            //do nothing
                        }else if(x >= 0 && y >= 0 && x < this.size && y < this.size && this.gameboard[x][y].nBombs != 0 ){
                            var cur = "["+ (x + 1) + "," + (y + 1) + "]";
                            var thisEntry = refEntries.find(i => i[0] === cur);

                            if(thisEntry && this.gameboard[x][y].IsRevealed != true && this.gameboard[x][y].IsBomb == false){
                                thisEntry[1][0].color = color;
                                thisEntry[1][0].enabled = 'none';
                                this.gameboard[x][y].setIsRevealed();
                                thisEntry[1][0].isNumber = this.gameboard[x][y].nBombs;
                            }
                        }else{
                            cur = "["+ (x + 1) + "," + (y + 1) + "]";
                            thisEntry = refEntries.find(i => i[0] === cur);

                            if(thisEntry && this.gameboard[x][y].IsRevealed != true && this.gameboard[x][y].IsBomb == false){
                                thisEntry[1][0].color = color;
                                thisEntry[1][0].enabled = 'none';
                                this.gameboard[x][y].setIsRevealed();
                                this.revealNeighbours(x, y, color);
                            }
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
        var bombs = (row + col)/2;
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
            a[w][h].IsBomb = true; //make new position is a bomb
        }
        for(i = 0; i < row; i++){ //1
            for( j=0; j < col; j++){ // 0
                var neighbouringBombs = 0;
                for(var k = 0; k < 3; k++){ 
                    for(var t= 0; t < 3; t++){  
                        var x = (i - 1 + k); // 0 > 1 > 2
                        var y = (j - 1 + t); // -1 > 0 > 1
                        if(x >= 0 && y >= 0 && x < row && y < row && a[x][y].IsBomb == true){
                            console.log(x, y + "for" + i, j);
                            neighbouringBombs ++;
                            console.log(neighbouringBombs);
                        }                        
                    }
                }
                console.log(a[i]);
                a[i][j].nBombs = neighbouringBombs;
                console.log(a[i]);
            }
        }
        console.log(a);
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