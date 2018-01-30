<template>
  <div class="rank-wrapper">
    <ul class="rank-list">
      <li class="rank-item">
        <div class="rank-image">
          <img :src="topImage"/>
        </div>
        <ul class="rank-songs">
          <li>1 第一名</li>
          <li>2 第二名</li>
          <li>3 第三名</li>
        </ul>
      </li>
      <li class="rank-item">
        <div class="rank-image">
          <img :src="topImage"/>
        </div>
        <ul class="rank-songs">
          <li>1 第一名</li>
          <li>2 第二名</li>
          <li>3 第三名</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
  // import cat from '../../../src/common/image/cat.jpeg'; //可以
  import cat from '@common/image/cat.jpeg';
  export default{
    created () {
      this.topImage = cat;
    }
  }
</script>
<style lang="scss">
@import 'src/common/style/variable';
.rank-wrapper {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .rank-list {
    .rank-item{
      margin: 20px 20px 0;
      display: flex;
      align-items: middle;
      .rank-image{
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .rank-songs{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: $color-highlight-background;
        padding: 0 20px;
        font-size: $font-size-small;
        color: $color-text-d;
        li{
          line-height: 26px;
        }
      }
      &:last-child{
        margin-bottom: 20px;
      }
    }
  }
}
</style>