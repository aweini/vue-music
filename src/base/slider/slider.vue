<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot"></span>
    </div>
  </div>
</template>
<script>
  // import {addClass} from '@common/js/dom'
  // import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
          
      }
    }
  }
</script>
<style lang="scss">
  .slider{
    min-height: 1px;
    .slider-group{
      position: relative;
      overflow: hidden;
      .slider-item{
        float: left;    
        box-sizing: border-box;
        a{
            display: block;
            width: 100%;
            text-decoration: none;
        }
        img{
            display: block;
            width: 100%;
        }
      }  
    }
  }    
</style>