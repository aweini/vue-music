<template>
  <scroll class="listview">
    <ul>
      <li v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>
<script>
  import scroll from '../scroll/scroll'
  export default{
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      scroll
    }
  }
</script>
<style lang='scss'>
@import 'src/common/style/variable';
.listview{
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list-group{
      width: 100%;
      color: $color-text-ll;
      font-size: $font-size-medium-x;
      .list-group-title{
        height: 40px;
        line-height:40px;
        padding-left: 20px;
        background: $color-highlight-background;
      }
      .list-group-item{
          display: flex;
          height: 60px;
          align-items: center;
          .avatar{
              width: 40px;
              height: 40px;
              border-radius: 40px;
              margin: 0 40px;
          }
          .name{

          }
      }
  }
}
</style>