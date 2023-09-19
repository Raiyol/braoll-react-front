import { Button, Chip, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import { Rating, Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import NovelsApi from '../../services/novels.api';
import './novel.page.scss';
import NovelSkeleton from './novel.skeleton';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextareaForm from '../../components/form_textarea/textarea.form';
import ReviewSortMenu from '../../components/menu/review-sort.menu';
import Review from '../../components/review/review';
import ReviewSkeleton from '../../components/review/review.skeleton';
import { useSelector } from 'react-redux';
import { NAV } from '../../utils/constant';
import ReviewsApi from '../../services/reviews.api';
import NotFound from '../not_found/not_found.page';
import BookmarksAction from '../bookmarks/bookmarks.action';

type QueryParams = {
  sort: string;
  pageNumber: number;
  pageSize: number;
};

const sortInfo = ['best', 'new', 'old'];
export default function Novel({ match }: RouteComponentProps<{ url: string }>) {
  const matchesIpad = useMediaQuery('(max-width:767px)');
  const [novel, setNovel] = useState<Novel>();
  const [chapters, setChapters] = useState<ChapterShort[]>();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [reviewsInfo, setReviewsInfo] = useState<Page<Review & User>>();
  const [reviewLoading, setReviewLoading] = useState(true);
  const [userReview, setUserReview] = useState<Review>();
  const [editReview, setEditReview] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [params] = useState<QueryParams>({
    sort: sortInfo[0],
    pageNumber: 1,
    pageSize: 10,
  });
  const user = useSelector((state: State) => state.user);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewForm>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const novelResp = await NovelsApi.getNovelByUrl(match.params.url);
        setNovel(novelResp.data);
        document.title = `${novelResp.data.name} - Broall`;
        //const chaptersResp = await NovelsApi.getNovelChaptersById(novelResp.data.id);
        setChapters(novelResp.data.chapters);
        const reviewsResp = await NovelsApi.getNovelReviewsById(novelResp.data.id, { ...params, pageNumber: params.pageNumber - 1 });
        setReviewsInfo(reviewsResp.data);
        setReviewLoading(false);
      } catch (error) {
        console.error(error);
        setNotFound(true);
      }
    };
    fetchData();
  }, [match, params]);

  const getReviews = async (nid = novel!.id) => {
    try {
      setReviewLoading(true);
      const reviewsResp = await NovelsApi.getNovelReviewsById(nid, params);
      setReviewsInfo(reviewsResp.data);
      setReviewLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && novel) {
      NovelsApi.getUserNovelReviewByid(novel.id)
        .then((resp) => setUserReview(resp.data))
        .catch((error) => console.error(error));
    }
  }, [user, novel]);

  if (notFound) {
    return <NotFound />;
  }

  if (!novel || !chapters || !reviewsInfo) {
    return <NovelSkeleton />;
  }

  const handleTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const handleSort = (value: string) => {
    params.sort = value;
    getReviews();
  };

  const handleReviewPage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (params.pageNumber === page) return;
    params.pageNumber = page;
    getReviews();
  };

  const onSubmit: SubmitHandler<ReviewForm> = async (data) => {
    try {
      if (userReview) {
        await ReviewsApi.editReview(userReview.id, data);
        setEditReview(false);
      } else {
        await NovelsApi.postNovelReview(novel.id, data);
      }
      await getReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const pagination = () => (
    <li className="flex-center">
      <Pagination size="small" className="pagination" page={page} onChange={(event, page) => setPage(page)} count={Math.ceil(chapters.length / 50)} color="primary" />
    </li>
  );

  const left = () => (
    <>
      <img className="img" src={process.env.PUBLIC_URL + `/media/novel/${novel.img}`} alt={novel.name} />
      <div className="genres">
        <h4>Genres</h4>
        <div>
          {novel.genres.map((genre, i) => (
            <Chip key={i} label={genre} component={Link} id={genre} to={`/novels?genre=${genre}`} variant="outlined" color="primary" size="small" />
          ))}
        </div>
      </div>
      <div className="rating">
        <h4>Rating</h4>
        <Rating defaultValue={Number(novel.rating)} precision={0.5} readOnly />
      </div>
      <div className="info">
        <h4>Author</h4>
        {novel.author}
      </div>
      <div className="info">
        <h4>Status</h4>
        {novel.completed ? 'Completed' : 'Ongoing'}
      </div>
      <div className="info">
        <h4>Date</h4>
        {DateTime.fromISO(novel.date).toFormat('yyyy-MM-dd')}
      </div>
    </>
  );

  const reviewForm = () => {
    if (!user) {
      return (
        <Button variant="contained" component={Link} to={NAV.LOGIN.link} color="primary" style={{ marginTop: 16 }}>
          Log In
        </Button>
      );
    }
    if (userReview && !editReview) {
      return (
        <Button variant="contained" color="primary" style={{ marginTop: 16 }} onClick={() => setEditReview(true)}>
          Edit Review
        </Button>
      );
    } else {
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="standard">
            <label className="mb-1">Rate</label>
            <Controller
              name="rate"
              control={control}
              defaultValue={userReview ? userReview.rate : 0}
              rules={{ required: true, min: 1, max: 5 }}
              render={({ field }) => <Rating name="rating" defaultValue={userReview ? userReview.rate : 0} onChange={field.onChange} />}
            />
            {errors.rate && <p className="err">Required field</p>}
          </div>
          <TextareaForm errors={errors} title="Content" name="review" options={{}} register={register} rows={8} defaultValue={userReview ? userReview.review : ''} />
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </form>
      );
    }
  };

  const right = () => (
    <>
      <div className="title">
        <h2>{novel.name}</h2>
        <h5>{novel.cn_name}</h5>
      </div>
      <div className="summary">
        {novel.summary.split('\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="content">
        <div className="tabs mt-4 mb-4">
          <Tabs value={tab} onChange={handleTab} indicatorColor="primary">
            <Tab label="Chapters" />
            <Tab label="Reviews" />
          </Tabs>
        </div>
        <div className="chapters" hidden={tab !== 0}>
          <ul className="list">
            {pagination()}
            {chapters
              .filter((chapter) => chapter.number >= (page - 1) * 50 && chapter.number < (page - 1) * 50 + 50)
              .map((chapter) => (
                <li className="flex-between" key={chapter.id}>
                  <Link id={chapter.title_en} to={`${novel.url}/chapters/${chapter.number}`}>
                    <strong>#{chapter.number}</strong> {chapter.title_en}
                  </Link>
                  <BookmarksAction id_novel={novel.id} chapter={chapter.number} />
                </li>
              ))}
            {pagination()}
          </ul>
        </div>
        <div className="reviews" hidden={tab !== 1}>
          <ul className="list">
            <li className="flex-between">
              <a href="#form">Write Review</a>
              <ReviewSortMenu options={sortInfo} defaultValue={sortInfo[0]} onSelected={handleSort} />
            </li>
            {reviewLoading ? <ReviewSkeleton /> : reviewsInfo.results.map((review) => <Review key={review.id} review={review} />)}
            <li className="flex-center">
              <Pagination size="small" className="pagination" page={params.pageNumber} onChange={handleReviewPage} count={Math.ceil(reviewsInfo.total / 10)} color="primary" />
            </li>
          </ul>
          <div className="form_style pt-4" id="form">
            <h2>Review</h2>
            {reviewForm()}
          </div>
        </div>
      </div>
    </>
  );

  if (matchesIpad) {
    return (
      <>
        <section className="novel">
          {left()} {right()}
        </section>
      </>
    );
  }

  return (
    <section className="novel">
      <div className="left">{left()}</div>
      <div className="right">{right()}</div>
    </section>
  );
}
