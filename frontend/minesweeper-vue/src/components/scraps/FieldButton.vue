<template>
    <button class="col-btn btn" :style="cssProps" @click="$emit('clicked')"><h6>{{ isBomb }}{{ isNumber }}</h6></button>
</template>
  
  <script>
    export default {

        props: {
        },

        data(){
            return{
                color: "#FFFFFF",
                enabled: null,
                isBomb: null,
                isNumber: null,
            }
        },
        computed: {
            cssProps() {
                return {
                    'background-color': this.color,
                    'pointer-events': this.enabled,
                    'margin': '0!important',
                    'padding': '0!important'
                }
            },
        },
        methods: {
        }
    };

</script>
<style scoped>
  .col-btn{ 
    width: 100%;
    aspect-ratio : 1 / 1;
    height: 100%;
    border-color: black;
    border-radius: 0;
   }   
   h6{
        font-size: 50%!important;
        align-content: center;
        padding: 10%;
   }
</style>