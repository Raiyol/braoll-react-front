import { Chip, useMediaQuery } from '@material-ui/core';
import { Pagination, PaginationItem, Rating, Skeleton } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ToggleButtons from '../../components/toggle-buttons/toggle-buttons';
import NovelsApi from '../../services/novels.api';
import './novels.page.scss';
import HiddenText from '../../components/text/hiddentext';
import { CalendarTodayOutlined, CreateOutlined, ImportContactsOutlined, ListAltOutlined } from '@material-ui/icons';
import { DateTime } from 'luxon';
import Ad from '../../components/ad/ad';

const statusInfo = ['any', 'ongoing', 'completed'];
const sortInfo = ['name', 'new', 'rating'];
const valueIsInList = (list: string[], value: string | null) => (value ? (list.includes(value) ? value : list[0]) : list[0]);

type QueryParams = {
  status: string;
  sort: string;
  pageNumber: string;
  pageSize: string;
  genre?: string;
};

export default function Novels() {
  const matchesIpad = useMediaQuery('(max-width:767px)');
  const query = new URLSearchParams(useLocation().search);
  const [novelsInfo, setNovelsInfo] = useState<Page<Novel>>();
  const [params] = useState<QueryParams>({
    status: valueIsInList(statusInfo, query.get('status')),
    sort: valueIsInList(sortInfo, query.get('name')),
    pageNumber: isNaN(Number(query.get('page'))) ? '1' : query.get('page') ?? '1',
    pageSize: '10',
    genre: query.get('genre') ?? undefined,
  });
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getNovels = async () => {
    history.push({ search: new URLSearchParams(params).toString() });
    setLoading(true);
    const response = await NovelsApi.getNovels({ ...params, pageNumber: +params.pageNumber - 1 });
    setLoading(false);
    setNovelsInfo(response.data);
  };

  const handleStatus = (value: string) => {
    if (!query.get('genre')) delete params.genre;
    params.status = value;
    getNovels();
  };
  const handleSort = (value: string) => {
    if (!query.get('genre')) delete params.genre;
    params.sort = value;
    getNovels();
  };
  const handleGenre = (value: string) => {
    params.genre = value;
    getNovels();
  };
  const handlePage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (Number(params.pageNumber) === page) return;
    if (!query.get('genre')) delete params.genre;
    params.pageNumber = page.toString();
    getNovels();
  };

  const pagination = () => (
    <Pagination
      size="small"
      className="pagination"
      page={Number(params.pageNumber)}
      onChange={handlePage}
      count={Math.ceil(novelsInfo?.total ? novelsInfo.total / 10 : 0)}
      color="primary"
      renderItem={(item) => <PaginationItem component={Link} to={`?${new URLSearchParams({ ...params, page: `${item.page}` }).toString()}`} {...item} />}
    />
  );

  useEffect(() => {
    document.title = `Novels - Broall`;
    NovelsApi.getNovels({ ...params, pageNumber: +params.pageNumber - 1 }).then((resp) => {
      setLoading(false);
      setNovelsInfo(resp.data);
    });
  }, [params]);

  return (
    <>
      <h1>Novels</h1>
      <section className="buttons_group">
        <div>
          <h3>Status</h3>
          <ToggleButtons exclusive className="toggle_group" options={statusInfo} callback={handleStatus} defaultValue={params.status} />
        </div>
        <div>
          <h3>Sort by</h3>
          <ToggleButtons exclusive className="toggle_group" options={sortInfo} callback={handleSort} defaultValue={params.sort} />
        </div>
      </section>
      <section className="novels">
        {pagination()}
        <ul className="list">
          {loading
            ? [0, 1].map((e, i) => (
                <li key={i} className="novel">
                  <div className="left">
                    {matchesIpad && <Skeleton variant="text" width={192} height={30} />}
                    <Skeleton variant="rect" width={192} height={288} />
                  </div>
                  <div className="right">
                    {!matchesIpad && <Skeleton variant="text" height={30} />}
                    <Skeleton variant="rect" height={250} />
                  </div>
                </li>
              ))
            : novelsInfo?.results.map((novel) => (
                <li key={novel.id} className="novel">
                  <div className="left">
                    {matchesIpad && (
                      <Link id={novel.url} to={`novels/${novel.url}`}>
                        <h4>{novel.name}</h4>
                      </Link>
                    )}
                    <Link id={novel.url} to={`novels/${novel.url}`}>
                      <img src={process.env.PUBLIC_URL + `/media/novel/${novel.img}`} alt={novel.name} />
                    </Link>
                    <div className="rating">
                      <Rating defaultValue={Number(novel.rating)} precision={0.5} readOnly />
                    </div>
                  </div>
                  <div className="right">
                    {!matchesIpad && (
                      <Link id={novel.url} to={`novels/${novel.url}`}>
                        <h4>{novel.name}</h4>
                      </Link>
                    )}
                    <div className="infos">
                      <div>
                        <CreateOutlined fontSize="small" />
                        {novel.author}
                      </div>
                      <div>
                        <ListAltOutlined fontSize="small" />
                        {novel.nchaps} Chapters
                      </div>
                      <div>
                        <CalendarTodayOutlined fontSize="small" />
                        {DateTime.fromISO(novel.date).toFormat('yyyy-MM-dd')}
                      </div>
                      <div>
                        <ImportContactsOutlined fontSize="small" />
                        {novel.completed ? 'Completed' : 'Ongoing'}
                      </div>
                    </div>
                    <div className="genres">
                      {novel.genres.map((genre, i) => (
                        <Chip
                          key={i}
                          label={genre}
                          onClick={() => handleGenre(genre)}
                          component={Link}
                          id={genre}
                          to={`?${new URLSearchParams({ ...params, genre }).toString()}`}
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                      ))}
                    </div>
                    {matchesIpad ? <HiddenText content={novel.summary} type="paragraph" limit={3} /> : novel.summary.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </li>
              ))}
        </ul>
        {pagination()}
      </section>
      <Ad ad_slot="7608182691" />
    </>
  );
}
