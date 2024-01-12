<template>
                <button class="col-btn btn" :style="cssProps" @click="$emit('clicked')"><h4>{{ isBomb }}{{ isNumber }}</h4></button>
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
                    var threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */

                    var hRed = hexToR(this.color);
                    var hGreen = hexToG(this.color);
                    var hBlue = hexToB(this.color);


                    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
                    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
                    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
                    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

                    var cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
                    if (cBrightness > threshold){
                        return{               
                            'background-color': this.color,
                            'pointer-events': this.enabled,
                            'margin': '0!important',
                            'padding': '0!important',
                            'color': "#000000"
                        }
                     } else {                         return{               
                            'background-color': this.color,
                            'pointer-events': this.enabled,
                            'margin': '0!important',
                            'padding': '0!important',
                            'color': "#FFFFFF"
                        }
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

    /* calculates perceived lightness using the sRGB Luma method 
    Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 */
    --r: calc(rgba(this.color, 0.5) * 0.2126);
    --g: calc(var(--green) * 0.7152);
    --b: calc(var(--blue) * 0.0722);
    --sum: calc(var(--r) + var(--g) + var(--b));
    --perceived-lightness: calc(var(--sum) / 255);
    
    /* shows either white or black color depending on perceived darkness */
    color: hsl(0, 0%, calc((var(--perceived-lightness) - var(--threshold)) * -10000000%)); 
   }   
   h6{
        font-size: 100%!important;
        align-content: center;
        padding: 10%;
   }
    :root {
    --color: this.color;
    /* the threshold at which colors are considered "light." Range: integers from 0 to 100,
    recommended 50 - 70 */
    --threshold: 50;
    }

</style>