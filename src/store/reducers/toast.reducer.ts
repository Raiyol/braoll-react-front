import { ACTIONS } from '../../utils/constant';

export const successToastReducer = (state = false, action: { type: string }) => {
  switch (action.type) {
    case ACTIONS.OPEN_TOAST:
      return true;
    case ACTIONS.CLOSE_TOAST:
      return false;
    default:
      return state;
  }
};
