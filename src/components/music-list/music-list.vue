<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <h1 class="title">
    {{title}}
    </h1>
    <div class="bg-image" :style="bgStyle">
    </div>
    <div>
      <song-list :songs="songs">
      </song-list>
    </div>
  </div>
</template>
<script>
  import songList from '@base/song-list/song-list'
  export default{
    components: {
      songList
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
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      back () {
      }
    },
    created () {
      console.log('music-list songs');
      console.log(this.songs);
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
    
}
</style>