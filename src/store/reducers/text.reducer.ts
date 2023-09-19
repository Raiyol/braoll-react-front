import { ACTIONS, LOCALSTORAGE_ITEM } from '../../utils/constant';

const langInitialState = {
  en: true,
  cn: true,
};

export const langsReducer = (state = langInitialState, action: { type: string; langs: LangsInfo }) => {
  switch (action.type) {
    case ACTIONS.SET_LANGS:
      return action.langs;
    default:
      return state;
  }
};

const fontSizeInitialState = 4;

export const fontSizeReducer = (state = fontSizeInitialState, action: { type: string; size?: number }) => {
  switch (action.type) {
    case ACTIONS.RESET_FONT_SIZE:
      localStorage.setItem(LOCALSTORAGE_ITEM.FONTSIZE, fontSizeInitialState.toString());
      return fontSizeInitialState;
    case ACTIONS.INCREASE_FONT_SIZE:
      const increaseSize = state < 10 ? state + 1 : state;
      localStorage.setItem(LOCALSTORAGE_ITEM.FONTSIZE, increaseSize.toString());
      return increaseSize;
    case ACTIONS.DECREASE_FONT_SIZE:
      const decraseSize = state > 2 ? state - 1 : state;
      localStorage.setItem(LOCALSTORAGE_ITEM.FONTSIZE, decraseSize.toString());
      return decraseSize;
    case ACTIONS.SET_FONT_SIZE:
      const newSize = action.size ? action.size : state;
      localStorage.setItem(LOCALSTORAGE_ITEM.FONTSIZE, newSize.toString());
      return newSize;
    default:
      return state;
  }
};
