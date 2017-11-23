<template>
  <div class="recommend" ref="recommend">
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
        <li v-for="item in discList" class="item">
          <img :src="item.imgurl" class="icon" />
          <div class="text">
            <h2 class="name">{{item.creator.name}}</h2>
            <p class="desc">{{item.dissname}}</p>
          </div>
        </li>
      </ul>
      
    </div>
  </div>
</template>
<script>
  import { getRecommend, getDiscList } from '@api/recommend'
  import { ERR_OK } from '@api/config'
  import slider from '@base/slider/slider'

  export default {
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      slider
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
      }
    }
  }
</script>
<style lang="scss">
@import "src/common/style/variable";

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

</style>