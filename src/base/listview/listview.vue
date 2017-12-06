<template>
  <!--这里@绑定的事件不能含－中划线 :绑定的属性可以用驼峰式也可以中划线隔开，但自组建接收参数时都是驼峰-->
  <scroll class="listview" 
          ref="scroll"
          :data="data"
          :listen-scroll = "listenScroll"
          @scroll = "scroll"
          :probe-type = "probeType"
          >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
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
          :class="{'current': currentIndex == index}">
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

  // 联动滚动  1 设置data-index 标记序号， 主界面序号和快捷键序号一一对应
  // 滑动主界面 用每个模块高度相加 计算出每个模块底部到 容器顶部的距离，滑动时监测鼠标落在哪个模块上就可取到模块的序号
  // 这样快捷键中对应的序号高亮
  // 点击快捷键，用e.target获取点击元素的data-index获取序号，主界面滚动到序号对应的模块
  // 滑动快捷键 计算滑动delta/每个快捷键高度 计算出划过的快捷键个数，知道划到哪个快捷键上了，就得到了序号

  // const TITLE_HEIGHT = 30;
  const ANCHOR_HEIGHT = 18;

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
        currentIndex: 0,
        scrollY: -1
      }
    },
    created () {
      this.listHeight = [];
      this.touch = {};
      this.listenScroll = true;
      this.probeType = 3;
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
      // console.log(this.$refs.scroll);
    },
    methods: {
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index');
        // this.currentIndex = anchorIndex;
        this._scrollTo(anchorIndex);
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
      },
      onShortcutTouchMove (e) {
        let moveTouch = e.touches[0];
        this.touch.y2 = moveTouch.pageY;
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
        // this.currentIndex = anchorIndex;
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
        this.currentIndex = index;
      },
      _calculateHeight () {
        this.listHeight = [];
        const list = this.$refs.listGroup;
        let height = 0;
        // listHeight的个数比 总模块个数多1
        this.listHeight.push(height);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          // height = item.offsetTop + item.clientHeight; // 也行
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        console.log(this.listHeight)
      },
      scroll (pos) {
        this.scrollY = pos.y;
      }
    },
    watch: {
      // 如果在父组件里用v-if数据有了 再渲染子组件， 子组件获取到的data会是完整的一直不变，这里也就检测不到了
      // 如果父组件不用v-if数据有了 而是直接传递data，一开始是空数组后来有数据再填充数组，子组建检测到data数据变化刷新组建
      data () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight;
        if (newY > 0) {
          this.currentIndex = 0;
          return;
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i;
            return;
          }
        }
        this.currentIndex = listHeight.length - 2;
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