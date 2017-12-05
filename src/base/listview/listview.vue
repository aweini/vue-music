<template>
  <scroll class="listview" ref="scroll">
    <ul>
      <li v-for="group in data" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" ref="listGroup">
            <img v-lazy="item.avatar" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
    @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList"
          :data-index="index" 
          class="item" 
          :class="{'current': currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
  import scroll from '../scroll/scroll';
  import loading from '../loading/loading';
  import { getData } from '@common/js/dom';
  export default{
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      scroll,
      loading
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    created () {
      this.listHeight = [];
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    mounted () {
      console.log(this.$refs.scroll);
    },
    methods: {
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index');
        this._scrollTo(anchorIndex);
      },
      onShortcutTouchMove (e) {
        let anchorIndex = getData(e.target, 'index');
        this._scrollTo(anchorIndex);
      },
      _scrollTo (index) {
        if (!index) {
          return;
        }
        if (index < 0) {
          index = 0;
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2;
        }
        this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0);
      },
      _calculateHeight () {
        this.listHeight = [];
        const list = this.$ref.listGroup;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._calculateHeight()
        })
      }
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
  background: $color-background;
  .list-group{
      padding-bottom: 30px;
      .list-group-title{
        height: 30px;
        line-height:30px;
        padding-left: 20px;
        color: $color-text-l;
        font-size: $font-size-small;
        background: $color-highlight-background;
      }
      .list-group-item{
          display: flex;
          align-items: center;
          padding: 20px 0 0 30px;
          .avatar{
              width: 50px;
              height: 50px;
              border-radius: 40px;
          }
          .name{
            margin-left: 20px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
      }
  }
  .list-shortcut{
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item{
      line-height: 1;
      padding: 3px;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current{
        color: $color-theme;
      }
    }
  }
  .list-fixed{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title{
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }
  .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>