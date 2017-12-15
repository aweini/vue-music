<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title">
    {{title}}
    </h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list" :data="songs" ref="list" :listen-scroll="listenScroll"
    :probe-type="probeType" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :songs="songs">
        </song-list>
      </div>
    </scroll>
  </div>
</template>
<script>
  import songList from '@base/song-list/song-list';
  import scroll from '@base/scroll/scroll';
  export default{
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
      },
      scroll (pos) {
        this.scrollY = pos.y;
      }
    },
    created () {
      this.listenScroll = true;
      this.probeType = 3;
    },
    mounted () {
      let bgImageHeight = this.$refs.bgImage.clientHeight;
      this.$refs.list.$el.style.top = `${bgImageHeight}px`;
    },
    watch: {
      scrollY (newVal) {
        this.$refs.layer.style.webkitTransform = `translate3d(0, ${newVal}px, 0)`
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