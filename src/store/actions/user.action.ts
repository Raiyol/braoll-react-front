import { Dispatch } from 'redux';
import AuthApi from '../../services/auth.api';
import UserApi from '../../services/user.api';
import { ACTIONS } from '../../utils/constant';

export const getUserInfo = async (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.GET_USER_REQUEST });
  try {
    const userResponse = await UserApi.getUserInfo();
    const bookmarks: { [id_number: number]: number } = {};
    userResponse.data.bookmarks.forEach((bookmark) => (bookmarks[bookmark.id_novel] = bookmark.chapter));
    setUserInfo(dispatch, { ...userResponse.data, bookmarksObj: bookmarks });
  } catch (error) {
    dispatch({ type: ACTIONS.GET_USER_ERROR });
  } finally {
    triedLogin(dispatch);
  }
};

export const setUserInfo = (dispatch: Dispatch, user: User) => {
  dispatch({ type: ACTIONS.GET_USER_SUCCESS, user });
  triedLogin(dispatch);
};

export const deleteUserInfo = async (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.DELETE_USER_REQUEST });
  try {
    await AuthApi.logout();
    dispatch({ type: ACTIONS.DELETE_USER_SUCCESS });
  } catch (error) {
    dispatch({ type: ACTIONS.DELETE_USER_ERROR });
  }
};

export const refreshUserInfo = (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.REFRESH_USER });
};

export const triedLogin = (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.TRIED_LOGIN });
};
