import { ACTIONS } from '../../utils/constant';
import { Dispatch } from 'redux';

export const setLangs = (dispatch: Dispatch, langs: LangsInfo) => {
  dispatch({ type: ACTIONS.SET_LANGS, langs });
};

export const increateFontSize = (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.INCREASE_FONT_SIZE });
};

export const decreaseFontSize = (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.DECREASE_FONT_SIZE });
};

export const resetFontSize = (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.RESET_FONT_SIZE });
};

export const setFontSize = (dispatch: Dispatch, size: number) => {
  dispatch({ type: ACTIONS.SET_FONT_SIZE, size });
};
