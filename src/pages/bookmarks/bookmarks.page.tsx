import { IconButton, useMediaQuery } from '@material-ui/core';
import { DeleteForeverOutlined, SkipNext } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserApi from '../../services/user.api';
import './bookmarks.page.scss';

export default function BookmarksPage() {
  const matchesIpad = useMediaQuery('(max-width:767px)');
  const user = useSelector((state: State) => state.user);
  const [bookmarkNovels, setBookmarkNovels] = useState<BookmarkNovel[]>();

  useEffect(() => {
    document.title = 'Bookmarks - Broall';
    UserApi.getBookmarkNovels().then((resp) => setBookmarkNovels(resp.data));
  }, []);

  const handleDelete = (id_novel: number) => {
    delete user.bookmarksObj[id_novel];
    setBookmarkNovels((prev) => prev?.filter((bookmarkNovel) => bookmarkNovel.id_novel !== id_novel));
    UserApi.deleteBookmark(id_novel);
  };

  const actionButtons = (id_novel: number, url: string, next_chapter?: number) => (
    <>
      {next_chapter && (
        <IconButton component={Link} to={`/novels/${url}/chapters/${next_chapter}`} size="small" color="primary">
          <SkipNext />
        </IconButton>
      )}
      <IconButton onClick={() => handleDelete(id_novel)} size="small" color="secondary">
        <DeleteForeverOutlined />
      </IconButton>
    </>
  );

  return (
    <>
      <h1>Bookmarks</h1>
      <section className="bookmarks">
        <table className="table">
          <thead className="pc">
            <tr>
              <th>Novels</th>
              <th>Bookmark</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {bookmarkNovels
              ? bookmarkNovels.map((bookmarkNovel) => (
                  <tr key={bookmarkNovel.id_novel}>
                    <td>
                      <div>
                        <Link className="ellipsis" to={`/novels/${bookmarkNovel.url}`}>
                          {bookmarkNovel.name}
                        </Link>
                        {matchesIpad && (
                          <div className="flex-between">
                            <span>
                              [ <Link to={`/novels/${bookmarkNovel.url}/chapters/${bookmarkNovel.chapter}`}>{bookmarkNovel.chapter}</Link> /{' '}
                              <Link to={`/novels/${bookmarkNovel.url}/chapters/${bookmarkNovel.current}`}>{bookmarkNovel.current}</Link> ]
                            </span>
                            <div>{actionButtons(bookmarkNovel.id_novel, bookmarkNovel.url, bookmarkNovel.chapter < bookmarkNovel.current ? bookmarkNovel.current : undefined)}</div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="pc">
                      <Link to={`/novels/${bookmarkNovel.url}/chapters/${bookmarkNovel.chapter}`}>{bookmarkNovel.chapter}</Link>
                    </td>
                    <td className="pc flex-between">
                      <Link to={`/novels/${bookmarkNovel.url}/chapters/${bookmarkNovel.current}`}>{bookmarkNovel.current}</Link>
                      <div>{actionButtons(bookmarkNovel.id_novel, bookmarkNovel.url, bookmarkNovel.chapter < bookmarkNovel.current ? bookmarkNovel.chapter + 1 : undefined)}</div>
                    </td>
                  </tr>
                ))
              : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((e, i) => (
                  <tr key={i}>
                    <td colSpan={3}>
                      <Skeleton variant="text" />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
