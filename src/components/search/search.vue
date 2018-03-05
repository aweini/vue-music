<template>
  <div class="search-wrapper">
    <div class="search-box-wrapper">
      <search-box  @query="changeQuery"></search-box>
    </div>
    <div class="shortcut-wrapper">
      <scroll>
        <div>
          <div class="hot-search">
            <h1>热门搜索</h1>
            <ul>
              <li>李宇春</li>
              <li>王菲</li>
              <li>大脸猫</li>
              <li>李宇</li>
              <li>爱吃</li>
              <li>鱼</li>
              <li>懒癌</li>
              <li>李宇春</li>
              <li>那年花开月正圆</li>
              <li>李宇春</li>
            </ul>
          </div>
          <div class="search-history">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <ul>
              <li>李宇春</li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import searchBox from '@base/search-box/search-box';
import scroll from '@base/scroll/scroll';
import {searchMixin} from '@common/js/mixin';
export default {
  mixins: [searchMixin],
  data () {
    return {
    };
  },
  components: {
    searchBox,
    scroll
  },
  methods: {
  }
};
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.search-wrapper {
  margin: 20px;
  .shortcut-wrapper {
    margin-top: 30px;
    .hot-search {
      h1 {
        font-size: $font-size-medium;
        color: $color-text-l;
        margin-bottom: 20px;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-medium;
        }
      }
    }
    .search-history {
      margin-top: 30px;
      .title {
        display: flex;
        align-items: center;
        color: $color-text-l;
        margin-bottom: 20px;
        font-size: $font-size-medium;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>