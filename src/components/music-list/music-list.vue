<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title">
    {{title}}
    </h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-random-wrapper">
        <div class="play-random" ref="randomPlay" @click="randomPlay">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" :data="songs" ref="list" :listen-scroll="listenScroll"
    :probe-type="probeType" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem">
        </song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
  import songList from '@base/song-list/song-list';
  import scroll from '@base/scroll/scroll';
  import {prefixStyle} from '@common/js/dom';
  import {mapActions} from 'vuex';
  import {playerMixin} from '@common/js/mixin';
  const RESERVED_HEIGHT = 40;
  const transform = prefixStyle('transform');
  const backdrop = prefixStyle('backdrop');
  export default{
    mixins: [playerMixin],
    components: {
      songList,
      scroll
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      back () {
        this.$router.back();
      },
      scroll (pos) {
        this.scrollY = pos.y;
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      randomPlay () {
        this.randomPlay(this.songs);
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    created () {
      this.listenScroll = true;
      this.probeType = 3;
    },
    mounted () {
      this.bgImageHeight = this.$refs.bgImage.clientHeight;
      this.$refs.list.$el.style.top = `${this.bgImageHeight}px`;
      this.maxTranslateY = RESERVED_HEIGHT - this.bgImageHeight;
      // 这两种ref时不一样的 this.$refs.bgImage 一个dom元素，this.$refs.list一个vue组件 它的$el属性代表它对应的dom对象
      console.log(this.$refs.bgImage);
      console.log(this.$refs.list)
    },
    watch: {
      scrollY (newVal) {
        console.log(newVal)
        let translateY = Math.max(this.maxTranslateY, newVal)
        this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
        let zIndex = 0;
        let scale = 1;
        let blur = 0;
        let percent = Math.abs(newVal / this.bgImageHeight);
        if (newVal > 0) {
          // 向下滑
          scale = 1 + percent;
        } else {
          blur = Math.min(20, percent * 20);
        }

        if (this.maxTranslateY > newVal) {
          // 向上滑过了
          zIndex = 10;
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
          this.$refs.bgImage.style.paddingTop = '0';
        } else {
          this.$refs.bgImage.style.height = 0;
          this.$refs.bgImage.style.paddingTop = '70%';
        }
        this.$refs.bgImage.style.zIndex = zIndex;
        console.log(['scale', scale])
        this.$refs.bgImage.style[transform] = `scale(${scale})`;
        this.$refs.bgImage.style[backdrop] = `blur(${blur}px)`;
      }
    }
  }
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.music-list{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
    z-index: 100;
    .back{
        position: absolute;
        left: 16px;
        top: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
        z-index: 50;
    }
    .title{
        position: absolute;
        top: 0;
        left: 10%;
        width: 80%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text;
        @include nowrap();
        z-index:40;
    }
    .bg-image{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        transform-origin: top;
        background-size: cover;
        .play-random-wrapper{
          position: absolute;
          width: 100%;
          bottom: 20px;
          z-index: 50;
          .play-random{
            width: 36%;
            margin: 0 auto;
            border: 1px solid $color-theme;
            border-radius: 100px;
            color: $color-theme;
            text-align: center;
            padding: 7px 0;
            font-size: $font-size-small;
            .icon-play{
              font-size: $font-size-medium-x;
              vertical-align: middle;
            }
          }
        }
        .filter{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(7, 17, 27, 0.4);
        }
    }
    .bg-layer{
      position: relative;
      height: 100%;
      background: $color-background;
    }
    .song-list-wrapper{
      padding: 20px 30px;
    }
    .list{
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      // overflow: hidden;
    }
    
}
</style>