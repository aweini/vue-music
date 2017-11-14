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
  import {addClass} from '@common/js/dom'
  import BScroll from 'better-scroll'
  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {

      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth();
        this._initSlider();
      }, 20)
    },
    activated () {

    },
    deactivated () {

    },
    beforeDestroy () {

    },
    methods: {
      _setSliderWidth () {
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          addClass(child, 'slider-item');
          child.style.width = sliderWidth + 'px';
          width += sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
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