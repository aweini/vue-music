<template>
<div class="progress-circle">
    <svg width="32" height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle r="50" cx="50" cy="50" fill="transparent" class="progress" 
        :stroke-dasharray="dashArray" 
        :stroke-dashoffset="dashOffset"
        />
    </svg>
    <slot></slot>
</div>
</template>
<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0.5
      },
      radius: {
        type: Number,
        default: 32
      }
    },
    data () {
      return {
        dashArray: 100 * Math.PI
      }
    },
    computed: {
      dashOffset () {
        return (1 - this.percent) * this.dashArray;
      }
    }
  }
</script>
<style lang="scss">
@import 'src/common/style/variable';
.progress-circle{
    position: relative;
    .progress{
        stroke: $color-theme;
        stroke-width: 10px;
        transform-origin: center;
        transform: scale(0.9) rotate(-90deg);
    }
}
</style>