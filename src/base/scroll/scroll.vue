<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  // const DIRECTION_H = 'horizontal';
  // const DIRECTION_V = 'vertical';
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
    //   listenScroll: {
    //     type: Boolean,
    //     default: false
    //   },
      data: {
        type: Array,
        default: null
      },
    //   pullup: {
    //     type: Boolean,
    //     default: false
    //   },
    //   beforeScroll: {
    //     type: Boolean,
    //     default: false
    //   },
      refreshDelay: {
        type: Number,
        default: 20
      }
    //   direction: {
    //     type: String,
    //     default: DIRECTION_V
    //   }
    },
    data () {
      return {
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return;
        }
        // 使用原生滚动的方向 eventPassthrough
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          eventPassthrough: 'horizontal'
        })
        // if (this.listenScroll) {
        //   this.scroll.on('scroll', (pos) => {
        //     this.$emit('scroll', pos);
        //   })
        // }
        // if (this.pullup) {
        //   this.scroll.on('scrollEnd', () => {
        //     if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
        //       this.$emit('scrollToEnd');
        //     }
        //   })
        // }
        // if (this.beforeScroll) {
        //   this.scroll.on('beforeScrollStart', () => {
        //     this.$emit('beforeScroll')
        //   })
        // }
      },
    //   disable () {
    //     this.scroll && this.scroll.disable();
    //   },
    //   enable () {
    //     this.scroll && this.scroll.enable();
    //   },
      refresh () {
        this.scroll && this.scroll.refresh();
      },
    //   scrollTo () {
    //     this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    //   },
    //   scrollToElement () {
    //     this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    //   }
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          // scroll出现的时候 有可能歌单列表还没有出来，等歌单数据出来歌单数据改变时 刷新scroll
          this.refresh();
        }, this.refreshDelay)
      }
    }
  }
</script>

<style lang="scss">
    
</style>