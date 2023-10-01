import { Button } from '@material-ui/core';
import { Menu, SkipNext, SkipPrevious } from '@material-ui/icons';
import { Fragment, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InView from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import TextareaForm from '../../components/form_textarea/textarea.form';
import ChaptersApi from '../../services/chapters.api';
import NovelsApi from '../../services/novels.api';
import { NAV } from '../../utils/constant';
import NotFound from '../not_found/not_found.page';
import ActionsButtons from './actions.buttons';
import './chapter.page.scss';
import ChapterSkeleton from './chapter.skeleton';
import Word from './word';
import Comment from '../../components/comment/comment';
import { Pagination } from '@material-ui/lab';
import CommentSkeleton from '../../components/comment/comment.skeleton';
import Ad from '../../components/ad/ad';

export default function Chapter({ match }: RouteComponentProps<{ url: string; num: string }>) {
  const [chapter, setChapter] = useState<Chapter>();
  const [notFound, setNotFound] = useState(false);
  const [commentsInfo, setCommentsInfo] = useState<Page<UserComment>>();
  const [pageComment, setPage] = useState(1);
  const langs = useSelector((state: State) => state.langs);
  const fontSIze = useSelector((state: State) => state.fontSize);
  const user = useSelector((state: State) => state.user);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>();

  useEffect(() => {
    setChapter(undefined);
    window.scrollTo(0, 0);
    NovelsApi.getChaptersByNovelUrlChapter(match.params.url, match.params.num)
      .then((resp) => {
        setChapter(resp.data);
        document.title = `#${resp.data.number} ${resp.data.titleEn} - Broall`;
      })
      .catch(() => setNotFound(true));
  }, [match]);

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      if (!chapter) return;
      switch (event.key) {
        case 'ArrowLeft':
          if (chapter.firstChapter !== chapter.number) {
            history.push(`${chapter.number - 1}`);
          }
          return;
        case 'ArrowRight':
          if (chapter.lastChapter !== chapter.number) {
            history.push(`${chapter.number + 1}`);
          }
          return;
        default:
          return;
      }
    };

    document.addEventListener('keydown', onDown);
    return () => {
      document.removeEventListener('keydown', onDown);
    };
  }, [chapter, history]);

  if (notFound) {
    return <NotFound />;
  }

  if (!chapter) {
    return <ChapterSkeleton />;
  }

  const onSubmit: SubmitHandler<CommentForm> = async (data) => {
    try {
      setCommentsInfo(undefined);
      await ChaptersApi.postCommentByChapterId(chapter.id, data);
      reset();
      getComments();
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async (page = pageComment) => {
    try {
      setCommentsInfo(undefined);
      const response = await ChaptersApi.getCommentsByChapterId(chapter.id, page - 1);
      setCommentsInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentsPage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (pageComment === page) return;
    setPage(page);
    getComments(page);
  };

  const navigation = () => (
    <div className="navigate">
      <div className="button">
        {chapter.number !== chapter.firstChapter && (
          <Button component={Link} to={`/novels/${match.params.url}/chapters/${chapter.number - 1}`} variant="outlined" color="primary">
            <SkipPrevious />
          </Button>
        )}
      </div>
      <Button component={Link} to={`/novels/${match.params.url}`} variant="outlined" color="primary">
        <Menu />
      </Button>
      <div className="button">
        {chapter.number !== chapter.lastChapter && (
          <Button component={Link} to={`/novels/${match.params.url}/chapters/${chapter.number + 1}`} variant="outlined" color="primary">
            <SkipNext />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <section className="chapter">
        <div className="title">
          <Link id={match.params.url} to={`/novels/${match.params.url}`}>
            {chapter.name}
          </Link>
          <h2>
            {chapter.number}: {chapter.titleEn}
          </h2>
        </div>
        <ActionsButtons />
        <Ad ad_slot="7608182691" />
        {navigation()}
        <div className="content">
          {chapter.content.map((line, i) => (
            <Fragment key={i}>
              {langs.cn && (
                <p className={`fs-${fontSIze + 2} cn`}>
                  {line.cn.map((word, i) => (
                    <Word key={i} def={chapter.dict[word]?.def} cn={word} py={chapter.dict[word]?.py} />
                  ))}
                </p>
              )}
              {langs.en && <p className={`fs-${fontSIze}`}>{line.en}</p>}
            </Fragment>
          ))}
        </div>
        {navigation()}
        <Ad ad_slot="7608182691" />
      </section>
      <section className="form_style">
        <h2>Comment</h2>
        {user ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextareaForm register={register} options={{ required: true, maxLength: 2048 }} errors={errors} name="comment" title="Content" rows={8} />
            <Button variant="contained" type="submit" color="primary">
              Submit
            </Button>
          </form>
        ) : (
          <Button variant="contained" component={Link} to={NAV.LOGIN.link} color="primary">
            Log In
          </Button>
        )}
      </section>
      <InView
        as="section"
        className="comments"
        triggerOnce
        onChange={(inView) => {
          if (inView) getComments();
        }}
        rootMargin="100px 0px"
      >
        {commentsInfo ? (
          <ul>
            <li>
              <h4>{commentsInfo.total} Comments</h4>
            </li>
            {commentsInfo.results.map((comment) => (
              <Comment key={comment.id} ucomment={comment} />
            ))}
            <li className="flex-center">
              <Pagination size="small" className="pagination" page={pageComment} onChange={handleCommentsPage} count={Math.ceil(commentsInfo.total / 10)} color="primary" />
            </li>
          </ul>
        ) : (
          <ul>
            <CommentSkeleton />
          </ul>
        )}
      </InView>
    </>
  );
}
