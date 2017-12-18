// 要么什么都不写，要么导出函数
import * as types from './mutation-types';
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_SEQUENCE_LIST, list);
  commit(types.SET_PLAYING_STATE, true);
  commit(types.SET_FULL_SCREEN, true);
}
