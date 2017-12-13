<template>
  <div>
    <div>bg</div>
    <div>
      <song-list></song-list>
    </div>
  </div>
</template>
<script>
  import songList from '@base/song-list/song-list'
  export default{
    components: {
      songList
    }
  }
</script>
<style>
</style>