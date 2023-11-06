<template>
    <div class="progress-bar-div">
        <h6>1/6 Players ready</h6>
        <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 15%"></div>
        </div>
    </div>
</template>

<style scoped>
    .progress{
        padding: 0;
        margin-top: 2vh;
        width: 22.5vw;
        margin-right: 2.5vw;
        margin-left: 2.5vw;
    }

    .progress-bar-div{
        padding: 0px;
    }

    .progress-bar-animated{
        background-color: rgb(24, 200, 91);
    }

    h6{
        font-size: 2vh; 
        padding-top: 4vh;
    }
</style>