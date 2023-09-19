import { ACTIONS } from '../../utils/constant';

export const userReducer = (state: Partial<User> | null = null, action: { type: string; user?: Partial<User> }) => {
  switch (action.type) {
    case ACTIONS.GET_USER_REQUEST:
    case ACTIONS.GET_USER_ERROR:
    case ACTIONS.DELETE_USER_ERROR:
    case ACTIONS.DELETE_USER_REQUEST:
    case ACTIONS.DELETE_USER_SUCCESS:
      return null;
    case ACTIONS.GET_USER_SUCCESS:
      return action.user;
    case ACTIONS.REFRESH_USER:
      return { ...state };
    default:
      return state;
  }
};

export const hasTriedToLog = (state = false, action: { type: string }) => {
  switch (action.type) {
    case ACTIONS.TRIED_LOGIN:
      return true;
    default:
      return state;
  }
};
