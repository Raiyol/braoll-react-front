import { ACTIONS } from '../../utils/constant';

export const openToast = () => {
  return { type: ACTIONS.OPEN_TOAST };
};

export const closeToast = () => {
  return { type: ACTIONS.CLOSE_TOAST };
};
