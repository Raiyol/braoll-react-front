import { combineReducers } from 'redux';
import { fontSizeReducer, langsReducer } from './text.reducer';
import { searchNovelsReducer } from './novels.reducer';
import { successToastReducer } from './toast.reducer';
import { hasTriedToLog, userReducer } from './user.reducer';

const reducers = combineReducers({
  successToast: successToastReducer,
  user: userReducer,
  triedLogin: hasTriedToLog,
  searchNovels: searchNovelsReducer,
  langs: langsReducer,
  fontSize: fontSizeReducer,
});

export default reducers;
