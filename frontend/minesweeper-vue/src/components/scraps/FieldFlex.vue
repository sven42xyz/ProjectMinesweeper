<template>
    <div class="row" v-for="i in size" v-bind:key="i" :style="cssProps">
        <div class="col" v-for="x in size" v-bind:key="x" style="height: 100%" :style="cssPropsW">
            <FButton :disabled="false" :ref="ref(i,x)" class="col-btn" v-on:click ="clicked(i,x)"><h7>.</h7></FButton>
        </div>
    </div>
</template>
  
<script setup>
  import FButton from './FieldButton.vue';
</script>

<script>
import SocketioService from '../../services/socketio.service.js';

//notes:
//%refs% -> client side
//pure js -> server

export default {
    props: {
        size: {
            type: Number,
            default: 6
        },
        color: {
            type: String,
            default: '#ff0000',
        },
        gameboard: {
            type: Array,
        },
        userId: {
            type: String,
        },
        roomId: {
            type: String,
        },
    },

    data() {
        return {
            CSSsize: 100 / this.size + '%',
            refEntries: null,
        }
    },

    mounted() {
        this.refEntries = Object.entries(this.$refs);
    },

    methods:{
        disable(message){
            console.log(message);
            this.player.disabled = true;
        },

        clicked(row, col) {
            const coordinates = {row: row, col: col};
            console.log(coordinates);
            const data = {userId: this.userId, roomId: this.roomId, coordinates: coordinates, refs: this.refEntries};
        
            SocketioService.handleGameboardClick(data, res => {
                if (res.status !== 200) {
                    console.log('Error: bad request');
                    return;
                }

                console.log(res);
            });
        },

/*         revealNeighbours(row, col, color) {
            let score = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const x = row + i;
                    const y = col + j;

                    if (x >= 0 && y >= 0 && x < this.size && y < this.size) {
                        const cur = `[${x + 1},${y + 1}]`;
                        const thisEntry = this.refEntries.find(entry => entry[0] === cur);
                        const currentCell = this.gameboard[x][y];

                        if (currentCell.IsBomb) {
                            continue;
                        } else if (currentCell.nBombs !== 0 && !currentCell.IsRevealed) {
                            this.updateEntry(thisEntry, color);
                            currentCell.setIsRevealed();
                            thisEntry[1][0].isNumber = currentCell.nBombs;
                            score += 1;
                        } else if (!currentCell.IsRevealed) {
                            this.updateEntry(thisEntry, color);
                            currentCell.setIsRevealed();
                            score += this.revealNeighbours(x, y, color);
                        }
                    }
                }
            }
            return score;
        }, */

/*         updateEntry(entry, color) {
            entry[1][0].color = color;
            entry[1][0].enabled = 'none';
        }, */

        ref(i, x) {
            return ("[" + i + "," + x + "]");
        },

/*         checkIfAllRevealed() {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    const cell = this.gameboard[i][j];

                    if (!cell.IsBomb && !cell.IsRevealed) {
                        return null;
                    }
                }
            }

            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    const cell = this.gameboard[i][j];

                    if (cell.IsBomb && !cell.IsRevealed) {
                        const cur = `[${i + 1},${j + 1}]`;
                        this.reveal(cur);
                        cell.setIsRevealed();
                    }
                }
            }

            return `${this.player.username} won with a score of ${this.player.score}`;
        },

        reveal(cur) {
            const thisEntry = this.refEntries.find(entry => entry[0] === cur);
            thisEntry[1][0].color = 'darkred';
            thisEntry[1][0].isBomb = 'X';
            thisEntry[1][0].enabled = 'none';
        } */
    },
    computed: {
        cssProps() {
            return {
                'height': this.CSSsize,
            }
        },
        cssPropsW() {
            return {
                'width': this.CSSsize,
            }
        }
    },

};
</script>
  
<style scoped>
.row {
    padding: 0;
    margin: 0;
}

.col {
    padding: 0;
    margin: 0;
}

.col-btn {
    width: 100%;
    aspect-ratio: 1 / 1;
}</style>