import { ACTIONS } from '../../utils/constant';
import NovelsApi from '../../services/novels.api';
import { Dispatch } from 'redux';

export const getSearchNovelsInfo = async (dispatch: Dispatch) => {
  dispatch({ type: ACTIONS.GET_SEARCH_REQUEST });
  try {
    const response = await NovelsApi.getSearchNovels();
    dispatch({ type: ACTIONS.GET_SEARCH_SUCCESS, novels: response.data });
  } catch (error) {
    dispatch({ type: ACTIONS.GET_SEARCH_ERROR });
  }
};
