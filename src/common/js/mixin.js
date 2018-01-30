import {mapGetters, mapMutations} from 'vuex';
import {shuffle} from '@common/js/util';
import {playMode} from '@common/js/config';
export const playerMixin = {
  computed: {
    iconMode () {
      let icon = '';
      icon = this.mode === 0 ? 'icon-sequence' : this.mode === 1 ? 'icon-loop' : 'icon-random';
      return icon;
    },
    ...mapGetters([
      'mode',
      'playList',
      'currentIndex',
      'sequenceList',
      'currentSong'
    ])
  },
  methods: {
    changeMode () {
      let mode = (this.mode + 1) % 3;
      this.setMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      let theCurrentSong = Object.assign({}, this.currentSong);
      console.log(['resetCurrentIndex', theCurrentSong]);
      this.setPlayList(list);
      let theCurrentSong2 = Object.assign({}, this.currentSong);
      console.log(['resetCurrentIndex', theCurrentSong2]);
      // 当设置最新index的时候playlist还是老的 curentsong会变
      // 当设置新的playlist的时候  playlist和index都是最新的 currentsong会变 但play.vue里监听currentsong时只监听到最后的这个，好像有延迟
    },
    resetCurrentIndex (list) {
      // list.forEach((item, index) => {
      //   if (item.id === this.currentSong.id) {
      //     this.setCurrentIndex(index);
      //   }
      // })
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index);
    },
    ...mapMutations({
      setMode: 'SET_MODE',
      setPlayList: 'SET_PLAY_LIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  }
}
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlayList(this.playList);
  },
  activated () {
    this.handlePlayList(this.playList);
  },
  methods: {
    handlePlayList () {
      throw new Error('component must implement handlePlayList method');
    }
  },
  watch: {
    playList (newVal) {
      this.handlePlayList(newVal);
    }
  }
}
