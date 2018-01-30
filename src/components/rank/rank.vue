<template>
<div class="rank-wrapper" ref="rankWrapper">
  <scroll  class="rank-list" :data="topList" ref="topList">
    <ul>
      <li class="rank-item" v-for="(item, index) in topList" key="index" @click="selectItem(item)">
        <div class="rank-image">
          <img v-lazy="item.picUrl"/>
        </div>
        <ul class="rank-songs">
          <li v-for="(value, index) in item.songList">{{index+1}} {{value.songname}}-{{value.singername}}</li>
        </ul>
      </li>
    </ul>
    <div class="loading-wrapper" v-if="!topList.length">
      <loading></loading>
    </div>
  </scroll>
  <router-view></router-view>
</div>
</template>
<script>
  // import cat from '../../../src/common/image/cat.jpeg'; //可以
  // import cat from '@common/image/cat.jpeg';
  import {getTopList} from '@api/rank';
  import {ERR_OK} from '@api/config';
  import scroll from '@base/scroll/scroll';
  import loading from '@base/loading/loading';
  import {mapMutations} from 'vuex';
  import {playListMixin} from '@common/js/mixin';
  export default{
    mixins: [playListMixin],
    data () {
      return {
        topList: []
      }
    },
    components: {
      scroll,
      loading
    },
    created () {
      // this.topImage = cat;
      this._getTopList();
    },
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : 0;
        this.$refs.rankWrapper.style.bottom = bottom;
        this.$refs.topList.refresh();
      },
      _getTopList () {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(['res', res])
            this.topList = res.data.topList;
          }
        })
      },
      selectItem (item) {
        this.$router.push({
          path: `rank/${item.id}`
        });
        this.setTopList(item);
      },
      ...mapMutations({
        setTopList: 'SET_TOP_LIST'
      })
    },
    watch: {
      topList () {
        setTimeout(() => {
          this.$Lazyload.lazyLoadHandler();
        }, 20)
      }
    }
  }
</script>
<style lang="scss">
@import 'src/common/style/variable';
@import 'src/common/style/mixin';
.rank-wrapper {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .rank-list {
    height: 100%;
    overflow: hidden;
    .rank-item{
      margin: 0 20px;
      padding-top: 20px;
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
        overflow: hidden;
        li{
          line-height: 26px;
          @include nowrap();
        }
      }
      &:last-child{
        padding-bottom: 20px;
      }
    }
  }
  .loading-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);

  }
}
</style>