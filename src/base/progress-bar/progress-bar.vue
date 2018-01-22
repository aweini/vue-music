<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar" @click="progressClick">
        <div class="progress" ref="progress"></div>
    </div>
    <div class="progress-btn" ref="progressBtn" 
        @touchstart.prevent="progressTouchstart" 
        @touchmove.prevent="progressTouchmove" 
        @touchend.prevent="progressTouchend">
    </div>
  </div>
</template>
<script>
  import {prefixStyle} from '@common/js/dom';
  const transform = prefixStyle('transform');
  const progressBtnWidth = 16;
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        touch: {}
      }
    },
    methods: {
      progressTouchstart (e) {
        this.touch = e.touches[0];
        this.touch.startX = this.touch.clientX;
        this.touch.left = this.$refs.progress.clientWidth;
        this.touch.initiated = true;
      },
      progressTouchmove (e) {
        if (!this.touch.initiated) {
          return;
        }
        this.touch.deltaX = e.touches[0].clientX - this.touch.startX;
        let progressWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + this.touch.deltaX));
        this._offset(progressWidth);
        // 不能改变props传过来的percent
        let percent = this._getPercent();
        // console.log(['touchmove', percent]);
        this.$emit('progressChanging', percent);
      },
      progressTouchend () {
        this.touch.initiated = false;
        // 设置移动距离
        // let progressWidth = this.touch.left + this.touch.deltaX;
        // this._offset(progressWidth);
        // 计算percent
        let percent = this._getPercent();
        // console.log(['touchend', percent]);
        // this.$emit('progressChanging', percent);
        this.$emit('progressChange', percent);
      },
      progressClick (e) {
        let rect = this.$refs.progressBar.getBoundingClientRect();
        let progressWidth = e.clientX - rect.left;
        this._offset(progressWidth);
        let percent = this._getPercent();
        this.$emit('progressChange', percent);
      },
      setProgressOffset (percent) {
        if (percent >= 0 && !this.touch.initiated) {
          let width = this.$refs.progressBar.clientWidth - progressBtnWidth;
          let progressWidth = width * percent;
          // console.log(['newPercent', newPercent])
          // console.log(['progressWidth', progressWidth]);
          this._offset(progressWidth);
        }
      },
      _offset (offsetWidth) {
        this.$refs.progressBtn.style[transform] = `translate(${offsetWidth}px, 0)`;
        this.$refs.progress.style.width = `${offsetWidth}px`;
      },
      _getPercent () {
        let progressWidth = this.$refs.progress.clientWidth;
        let realProgressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        let percent = progressWidth / realProgressBarWidth;
        console.log(['progressWidth', progressWidth]);
        console.log(['realProgressBarWidth', realProgressBarWidth]);
        console.log(['_getPercent', percent]);
        return percent;
      }
    },
    watch: {
      percent (newPercent) {
        // console.log(['percent', this.percent]);
        // console.log(['newPercent', newPercent]);
        this.setProgressOffset(newPercent);
      }
    }
  }
</script>
<style lang="scss">
@import 'src/common/style/variable';
.progress-bar{
  position: relative;
  width: 100%;
  height: 30px;
  .bar{
    position: absolute;
    width: 100%;
    height: 4px;
    top: 13px;
    background: $color-background-d;
    .progress{
        position: absolute;
        width: 0;
        height: 100%;
        background: $color-theme;
    }
  }
  .progress-btn{
    position: absolute;
    top: 7px;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    box-sizing: border-box;
    border: 3px solid $color-text;
    background: $color-theme;
  }
}
</style>