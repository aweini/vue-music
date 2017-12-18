<template>
  <div id="app">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tabs from '@components/tabs/tabs';
import '@/common/style/variable';
import player from '@components/player/player';
export default {
  components: {
    MHeader,
    Tabs,
    player
  }
}
</script>

<style>

</style>
