<template>
    <div class="progress-bar-div">
        <h6>{{playersReadyCount}}/{{playercount}} Players ready</h6>
        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
            <div :style="cssVars" class="progress-bar progress-bar-striped progress-bar-animated"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            playercount: {
                type: Number,
                default: 6
            },
            playersReadyCount: {
                type: Number,
                default: 0
            }
        },
        computed: {
            cssVars() {
                return {
                    "width": `${(this.playersReadyCount * 100) / this.playercount}%`
                };
            }
        }   
    }
    
</script>

<style scoped>
    .progress{
        padding: 0;
        margin-top: 2vh;
        width: 90%;
        margin-right: 2.5vmin;
        margin-left: 2.5vmin;
    }

    .progress-bar-div{
        padding: 0px;
        align-items: center;
        padding-left: 5vmin;
        padding-right: 5vmin;
    }

    .progress-bar-animated{
        background-color: rgb(24, 200, 91);
    }

    h6{
        font-size: 2vh; 
        padding-top: 4vh;
        text-align: center;
    }
</style>