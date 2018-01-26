export const singer = state => state.singer;
export const playing = state => state.playing;
export const fullScreen = state => state.fullScreen;
export const playList = state => state.playList;
export const sequenceList = state => state.sequenceList;
export const mode = state => state.mode;
export const currentIndex = state => state.currentIndex;
export const currentSong = state => {
  console.log('currentSong要变啦啦啦啦啦啦啦啦');
  return state.playList[state.currentIndex] || {};
};
export const currentDisc = state => state.currentDisc;
