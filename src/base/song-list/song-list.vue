<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songs">
        <h1>{{item.name}}</h1>
        <span>{{item.singer}} {{item.album}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    created () {
      console.log('this.songs')
      console.log(this.songs)
    }
  }
</script>

<style lang="scss">
.song-list{
    width: 100%;
}
</style>