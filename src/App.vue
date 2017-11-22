<template>
  <div id="app">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from '@/components/m-header/m-header';
import Tabs from '@components/tabs/tabs';
import '@/common/style/variable';
export default {
  components: {
    MHeader,
    Tabs
  }
}
</script>

<style>

</style>
