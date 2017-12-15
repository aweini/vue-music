<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songs" class="item">
        <div class="content">
          <h1 class="name">{{item.name}}</h1>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    created () {
      console.log('this.songs')
      console.log(this.songs)
    },
    methods: {
      getDesc (item) {
        return `${item.singer}·${item.album}`
      }
    }
  }
</script>

<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.song-list{
  width: 100%;
  .item{
    display: flex;
    height: 64px;
    font-size: $font-size-medium;
    align-items: center;
    .content{
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name{
        @include nowrap();
        color: $color-text;
      }
      .desc{
        @include nowrap();
        color: $color-text-d;
        margin-top: 4px;
      }
    }
    
  }
}
</style>