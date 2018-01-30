<template>
<div>
    <!--songs必须传过去吗，因为他是个Object/Array-->
    <music-list :songs="songs" :bgImage="bgImage" :title="title" :rank="rank">
    </music-list>
</div>
</template>
<script>
  import MusicList from '@components/music-list/music-list';
  import {mapGetters} from 'vuex';
  import {getSongList} from '@api/rank';
  import {ERR_OK} from '@api/config';
  import {createSong} from '@common/js/song';
  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'topList'
      ]),
      title () {
        return this.topList.topTitle;
      },
      bgImage () {
        return this.songs[0] && this.songs[0].image;
      }
    },
    components: {
      MusicList
    },
    created () {
      this.rank = true;
      console.log(['params'], this.$route.params);
      this._getSongList(this.$route.params.id);
    },
    methods: {
      _getSongList (id) {
        getSongList(id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist);
            console.log(['topListSongs', this.songs]);
          }
        })
      },
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((item) => {
          const musicData = item.data
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