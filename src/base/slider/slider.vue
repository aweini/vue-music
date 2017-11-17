<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots"></span>
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
        currentPageIndex: 0,
        dots: []
      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth();
        this._initDots();
        this._initSlider();
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) {
          return
        }
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) {
            this._onScrollEnd()
          } else {
            if (this.autoPlay) {
              this._play()
            }
          }
          this.refresh()
        }, 60)
      })
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
        width += sliderWidth * 2;
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initDots () {
        this.dots = new Array(this.children.length);
        console.log('dots:' + this.dots.length);
        // 另外两个添加的， 在这之后添加
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

        this.slider.on('scrollEnd', this._onScrollEnd);

        this.slider.on('touchend', () => {
          if (this.autoPlay) {
            this._play();
          }
        })

        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this._play();
        }
      },
      _play () {
        let pageIndex = this.slider.getCurrentPage().pageX + 1;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }

    }
  }
</script>
<style lang="scss">
  @import 'src/common/style/variable';
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
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
      .dot{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin: 0 4px;
        background: $color-text-l;
        &.active{
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }    
</style>