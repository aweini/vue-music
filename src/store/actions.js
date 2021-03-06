// 要么什么都不写，要么导出函数
import * as types from './mutation-types';
import {playMode} from '@common/js/config';
import {shuffle} from '@common/js/util';
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);
    commit(types.SET_PLAY_LIST, randomList);
    index = findIndex(randomList, list[index]);
  } else {
    commit(types.SET_PLAY_LIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
}
function findIndex (list, currentSong) {
  return list.findIndex((item) => {
    return item.id === currentSong.id
  });
}

export const randomPlay = function ({commit, state}, {list}) {
  commit(types.SET_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  console.log(['action list', list]);
  console.log(['action state.sequenceList', state.sequenceList]);
  let randomList = shuffle(state.sequenceList);
  commit(types.SET_PLAY_LIST, randomList);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
}
