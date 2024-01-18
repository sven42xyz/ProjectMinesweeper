<template>
    <div class="row" v-for="i in size" v-bind:key="i" :style="cssProps">
        <div class="col" v-for="x in size" v-bind:key="x" style="height: 100%" :style="cssPropsW">
            <!-- hier muss dann der disabled state rein -->
            <FButton :disabled="this.disabled" :ref="ref(i,x)" class="col-btn" v-on:click ="clicked(i,x)"><h7>.</h7></FButton>
        </div>
    </div>
</template>
  
<script setup>
  import FButton from './FieldButton.vue';
</script>

<script>
import SocketioService from '../../services/socketio.service.js';
import { usePlayerStore } from '@/store/player';

//notes:
//%refs% -> client side
//pure js -> server

export default {
    props: {
        size: {
            type: Number,
            default: 6
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
        disabled: {
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

    created() {
        this.playerStore = usePlayerStore();
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

    sockets: {
        connect() {
            console.log('Connected...');
        },
        disconnect() {
            console.log('Disconnected...');
        },
        "update gameboard"(res) {
            this.updateGameboard(this.refEntries, res.refEntries)
        },
    },

    methods:{
        disable(message){
            console.log(message);
            this.player.disabled = true;
        },

        clicked(row, col) {
            const coordinates = {row: row, col: col};
            const data = {userId: this.userId, roomId: this.roomId, coordinates: coordinates, refs: this.refEntries};
        
            SocketioService.handleGameboardClick(data, res => {
                if (res.status !== 200) {
                    console.log('Error: bad request');
                    return;
                }

                // handle the gameboard in the DOM
/*                 this.updateGameboard(this.refEntries, res.game.refEntries)
 */            });
        },

        updateGameboard(localRef, remoteRef) {
            localRef.forEach(element => {
                element[1][0].color     = remoteRef[localRef.indexOf(element)][1][0].color   
                element[1][0].enabled   = remoteRef[localRef.indexOf(element)][1][0].enabled 
                element[1][0].isBomb    = remoteRef[localRef.indexOf(element)][1][0].isBomb  
                element[1][0].isNumber  = remoteRef[localRef.indexOf(element)][1][0].isNumber
                element[1][0].sockets   = remoteRef[localRef.indexOf(element)][1][0].sockets                 
            });
        },

        ref(i, x) {
            return ("[" + i + "," + x + "]");
        },
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