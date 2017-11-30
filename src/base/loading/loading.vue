<template>
  <div class="loading">
    <img src="./loading.gif" />
    <p>{{desc}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      desc: {
        type: String,
        default: '正在加载中....'
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/common/style/variable';
  .loading {
    width: 100%;
    text-align: center;
    img {
      width:24px;
      height: 24px;
    }
    p {
        line-height: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
    }
  }
</style>