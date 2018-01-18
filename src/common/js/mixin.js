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
      this.setPlayList(list);
      this.resetCurrentIndex(list);
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
      setPlayList: 'SET_PLAYLIST',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    })
  }
}
