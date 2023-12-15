<template>
    <button class="col-btn" :style="cssProps" @click="$emit('clicked')"><h7>{{ isBomb }}{{ isNumber }}</h7></button>
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
   }   
   .h6{
        color: transparent;
   }
</style>