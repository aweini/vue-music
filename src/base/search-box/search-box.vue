<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" placeholder="查询" v-model="query"/>
    <i class="icon-dismiss"></i>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      query: ''
    };
  },
  methods: {
  },
  watch: {
    query (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('query', newVal);
      }
    }
  }
};
</script>
<style lang="scss">
@import 'src/common/style/variable';
.search-box {
  display: flex;
  align-items: center;
  height: 40px;
  background: $color-highlight-background;
  padding: 0 6px;
  border-radius: 6px;
  .icon-search {
    font-size: 24px;
    color: $color-background;
  }
  input {
    flex: 1;
    background: transparent;
    margin: 0 5px;
    color: $color-text;
    outline: 0;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-background;
  }
}
</style>