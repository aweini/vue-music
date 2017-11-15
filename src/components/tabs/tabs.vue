<template>
  <div class="tabs">
    <router-link to="/recommend" class="tab-item">
        <div>推荐</div>
    </router-link>
    <router-link to="/singer" class="tab-item">
        <div>歌手</div>
    </router-link>
    <router-link to="/rank" class="tab-item">
        <div>排行</div>
    </router-link>
    <router-link to="/search" class="tab-item">
        <div>搜索</div>
    </router-link>
  </div>
</template>
<script>
    export default{
    }
</script>
<style lang="scss">
.tabs{
    width:100%;
    height:40px;
    display: flex;
    .tab-item{
        flex: 1;
        text-align: center;
    }
}
</style>