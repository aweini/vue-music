<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider ref="slider">
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl"/>
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" class="item" @click="selectDisc(item)" :key="index">
              <img v-lazy="item.imgurl" class="icon" />
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import { getRecommend, getDiscList } from '@api/recommend'
  import { ERR_OK } from '@api/config'
  import slider from '@base/slider/slider'
  import scroll from '@base/scroll/scroll'
  import loading from '@base/loading/loading'
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      slider,
      scroll,
      loading
    },
    created () {
      this._getRecommend();
      this._getDiscList();
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
            console.log(res)
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list;
            console.log(this.discList)
          }
        })
      },
      selectDisc (disc) {
        this.setCurrentDisc(disc)
        this.$router.push({
          path: `/recommend/${disc.dissid}`
        });
      },
      ...mapMutations({
        setCurrentDisc: 'SET_CURRENT_DISC'
      })
    }
  }
</script>
<style lang="scss">
@import "src/common/style/variable";
.recommend{
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .recommend-content{
    height: 100%;
    overflow: hidden;
    .slider-wrapper{
      position: relative;
      width: 100%;
    }
    .recommend-list{
      width: 100%;
      .list-title{
        height: 65px;
        line-height: 65px;
        color: $color-theme;
        text-align: center;
        font-size: $font-size-medium;
      }
      .item{
        display: flex;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon{
          flex: 0 0 60px;
          padding-right: 20px;
          width: 60px;
        }
        .text{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: $font-size-medium;
          line-height: 20px;
          .name{
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc{
            color: $color-text-d;
          }
        }
      }
    }
  }
}
</style>