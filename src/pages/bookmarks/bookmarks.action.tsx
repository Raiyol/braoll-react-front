import { IconButton, IconButtonProps } from '@material-ui/core';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import UserApi from '../../services/user.api';
import { refreshUserInfo } from '../../store/actions/user.action';

type Props = {
  id_novel: number;
  chapter: number;
} & IconButtonProps;

export default function BookmarksAction({ id_novel, chapter, ...rest }: Props) {
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();

  const setNewBookmarks = async () => {
    if (user.bookmarksObj[id_novel] === chapter) {
      return;
    }
    if (!user.bookmarksObj[id_novel]) {
      user.bookmarksObj[id_novel] = chapter;
      refreshUserInfo(dispatch);
      await UserApi.insertBookmark(id_novel, chapter);
    } else {
      user.bookmarksObj[id_novel] = chapter;
      refreshUserInfo(dispatch);
      await UserApi.editBookmark(id_novel, chapter);
    }
  };

  if (!user || !user.bookmarksObj) {
    return <></>;
  }

  if (!user.bookmarksObj[id_novel] || user.bookmarksObj[id_novel] < chapter) {
    return (
      <IconButton color="primary" onClick={setNewBookmarks} size="small" {...rest}>
        <BookmarkBorder />
      </IconButton>
    );
  }

  return (
    <IconButton color="primary" onClick={setNewBookmarks} size="small" {...rest}>
      <Bookmark />
    </IconButton>
  );
}
