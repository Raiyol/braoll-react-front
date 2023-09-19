import { Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import Slider from '../../components/carousel/slider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NovelsApi from '../../services/novels.api';
import './home.page.scss';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import BookmarksAction from '../bookmarks/bookmarks.action';
import ChaptersApi from '../../services/chapters.api';

export default function Home() {
  const matchesIpad = useMediaQuery('(max-width:767px)');
  const [randomNovels, setRandomNovels] = useState<RandomNovel[]>([]);
  const [recentChapters, setRecentChapters] = useState<RecentChapter[]>();
  const getRandomNovels = async () => {
    const response = await NovelsApi.getRandomNovels();
    setRandomNovels(response.data);
  };
  const getRecentChapters = async () => {
    const response = await ChaptersApi.getRecentChapters();
    setRecentChapters(response.data);
  };
  useEffect(() => {
    document.title = 'Broall - MTL of Chinese Webnovel';
    try {
      getRandomNovels();
      getRecentChapters();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <h1>Home</h1>
      <section>
        <h2>Random Picks :</h2>
        {randomNovels.length >= 3 ? <Slider slides={randomNovels} autoPlay={5} /> : <Skeleton variant="rect" height={244} />}
      </section>
      <section>
        <h2>Recents :</h2>
        <div className="recents">
          <table className="table">
            <thead className="pc">
              <tr>
                <th>Novel</th>
                <th>Release</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentChapters
                ? recentChapters.map((chapter, i) => (
                    <tr key={i}>
                      <td>
                        <div className="ellipsis">
                          <Link className="novel" id={chapter.url} to={`/novels/${chapter.url}`}>
                            {chapter.name}
                          </Link>
                          {matchesIpad && (
                            <div className="flex-between">
                              <span>
                                <Link id={chapter.chapter.toString()} to={`/novels/${chapter.url}/chapters/${chapter.chapter}`}>
                                  <strong>c{chapter.chapter}</strong>
                                </Link>
                                <span>({DateTime.now().diff(DateTime.fromISO(chapter.date)).toFormat('d')} days ago)</span>
                              </span>
                              <BookmarksAction chapter={chapter.chapter} className="primary" id_novel={chapter.id} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="pc">
                        <div className="ellipsis">
                          <Link id={chapter.chapter.toString()} to={`/novels/${chapter.url}/chapters/${chapter.chapter}`}>
                            <strong>{chapter.chapter}</strong> {chapter.title_en}
                          </Link>
                        </div>
                      </td>
                      <td className="pc flex-between">
                        <div className="ellipsis">{DateTime.now().diff(DateTime.fromISO(chapter.date)).toFormat('d')} days ago</div>
                        <BookmarksAction chapter={chapter.chapter} id_novel={chapter.id} />
                      </td>
                    </tr>
                  ))
                : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((e, i) => (
                    <tr key={i}>
                      <td colSpan={3}>
                        <Skeleton variant="text" />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
