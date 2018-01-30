import * as types from './mutation-types';
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer;
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    console.log(['types.SET_PLAYING_STATE', state.playing]);
    state.playing = flag;
    console.log(['types.SET_PLAYING_STATE', state.playing]);
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playList = list;
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list;
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index;
  },
  [types.SET_CURRENT_DISC] (state, disc) {
    state.currentDisc = disc
  },
  [types.SET_TOP_LIST] (state, topList) {
    state.topList = topList;
  }
}
export default mutations;
