<template>
  <div class="search-wrapper">
    <div class="search-box-wrapper">
      <search-box :query="query"></search-box>
    </div>
  </div>
</template>
<script>
  import searchBox from '@base/search-box/search-box';
  export default {
    data () {
      return {
        query: ''
      }
    },
    components: {
      searchBox
    }
  }
</script>
<style lang="scss">
.search-wrapper{
  margin: 20px;
}
</style>