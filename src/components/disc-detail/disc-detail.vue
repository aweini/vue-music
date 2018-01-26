<template>
    <transition name="slide">
        <music-list :title="title" :songs="songs" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getDiscSongList } from '@api/recommend';
  import musicList from '@components/music-list/music-list';
  import {createSong, isValidMusic} from '@common/js/song';
  import {ERR_OK} from '@api/config';
  export default{
    data () {
      return {
        songs: []
      }
    },
    components: {
      musicList
    },
    computed: {
      ...mapGetters([
        'currentDisc'
      ]),
      title () {
        return this.currentDisc.dissname;
      },
      bgImage () {
        return this.currentDisc.imgurl;
      }
    },
    created () {
      this._getDiscInfo();
    },
    methods: {
      _getDiscInfo () {
        getDiscSongList(this.currentDisc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            console.log('disc-detail...........');
            console.log(res);
            this.songs = this._normalizeSongs(res.cdlist[0].songlist);
          }
        })
      },
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((musicData) => {
          if (isValidMusic(musicData)) {
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