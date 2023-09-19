import { ACTIONS } from '../../utils/constant';

export const searchNovelsReducer = (state: SearchNovel[] = [], action: { type: string; novels?: SearchNovel[] }) => {
  switch (action.type) {
    case ACTIONS.GET_SEARCH_REQUEST:
    case ACTIONS.GET_SEARCH_ERROR:
      return [];
    case ACTIONS.GET_SEARCH_SUCCESS:
      return action.novels;
    default:
      return state;
  }
};
