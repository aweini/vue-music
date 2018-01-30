<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(item, index)" v-for="(item,index) in songs" class="item">
        <div v-show="rank" class="rank">
          <span :class="getRankClass(index)" v-text="getRankText(index)"></span>
        </div>
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
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    created () {
      console.log('this.songs')
      console.log(this.songs)
    },
    methods: {
      getDesc (item) {
        return `${item.singer}·${item.album}`
      },
      selectItem (item, index) {
        this.$emit('select', item, index);
      },
      getRankClass (index) {
        if (index < 3) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText (index) {
        if (index > 2) {
          return index + 1;
        }
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
    .rank{
      flex: 0 0 25px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .icon{
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0{
          background-image: url('./first.png')
        }
        &.icon1{
          background-image: url('./second.png')
        }
        &.icon2{
          background-image: url('./third.png')
        }
      }
      .text{
        font-size: $font-size-large;
        color: $color-theme;
      }
    }
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