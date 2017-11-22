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
.slider-wrapper{
  position: relative;
  width: 100%;
   
}
</style>