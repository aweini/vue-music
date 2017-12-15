<template>
  <transition name="slide">
    <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import {getSingerDetail} from '@api/singer'
  import {mapGetters} from 'vuex'
  import musicList from '@components/music-list/music-list'
  import {createSong} from '@common/js/song'
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
    created () {
      this._getSingerDetail();
    },
    methods: {
      _getSingerDetail () {
        if (!this.singer.id) {
          this.$router.push('/singer');
          return;
        }
        getSingerDetail(this.singer.id).then((res) => {
          console.log(res);
          this.songs = res.data.list;
          console.log(['unnormalizeSongs', this.songs]);
          this.songs = this._normalizeSongs(this.songs);
          console.log(['normalizeSongs', this.songs]);
        })
      },
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((item) => {
          let {musicData} = item;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret;
      }
    }

  }
</script>
<style lang="scss">
  
</style>