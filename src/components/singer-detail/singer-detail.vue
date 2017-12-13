<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import {mapGetters} from 'vuex'
  import musicList from '@components/music-list/music-list'
  export default {
    props: {
    },
    components: {
      musicList
    },
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.singer.name;
      },
      bgImage () {
        return this.singer.avatar;
      },
      ...mapGetters([
        'singer'
      ])
    },
    create () {
      // let singerId = this.params.id;
    }
  }
</script>
<style lang="scss">
  
</style>