import { Button, Tab, Tabs } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentSkeleton from '../../components/comment/comment.skeleton';
import Review from '../../components/review/review';
import ReviewSkeleton from '../../components/review/review.skeleton';
import UserApi from '../../services/user.api';
import Comment from '../../components/comment/comment';
import './user.page.scss';

export default function UserPage() {
  const [userDetail, setUserDetail] = useState<UserDetail>();
  const [tab, setTab] = useState(0);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [reviewsInfo, setReviewsInfo] = useState<Page<Review & User & Partial<Novel>>>();
  const [commentsInfo, setCommentsInfo] = useState<Page<UserComment>>();
  const user = useSelector((state: State) => state.user);

  useEffect(() => {
    document.title = 'Profile - Broall';
    UserApi.getUserInfoDetail().then((resp) => setUserDetail(resp.data));
    UserApi.getReviews(1).then((resp) => setReviewsInfo(resp.data));
    UserApi.getComments(1).then((resp) => setCommentsInfo(resp.data));
  }, []);

  if (!user || !userDetail) {
    return <></>;
  }

  const handleReviewsPage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (reviewsPage === page) return;
    setReviewsPage(page);
    setReviewsInfo(undefined);
    UserApi.getReviews(page).then((resp) => setReviewsInfo(resp.data));
  };

  const handleCommentsPage = (event: React.ChangeEvent<unknown>, page: number) => {
    if (commentsPage === page) return;
    setCommentsPage(page);
    setCommentsInfo(undefined);
    UserApi.getComments(page).then((resp) => setCommentsInfo(resp.data));
  };

  const handleTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <h1>Profile</h1>
      <section className="profile">
        <div className="left flex col">
          <img src={`https://secure.gravatar.com/avatar/${user.pfp}?s=220&r=pg&d=mp`} alt="avatar" />
          <div className="button">
            <Button variant="outlined" color="primary" component="a" href="https://gravatar.com/" disableElevation>
              Change Avatar
            </Button>
          </div>
          <div>
            <h4>Pseudo</h4>
            {user.name}
          </div>
          <div>
            <h4>E-mail</h4>
            {userDetail.email}
          </div>
          <div>
            <h4>Joined</h4>
            {DateTime.fromISO(userDetail.date).toFormat('yyyy-MM-dd HH:mm')}
          </div>
        </div>
        <div className="right">
          <div className="tabs mb-4">
            <Tabs value={tab} onChange={handleTab} indicatorColor="primary">
              <Tab label="Reviews" />
              <Tab label="Comments" />
            </Tabs>
          </div>
          <div hidden={tab !== 0}>
            <ul className="list">
              {reviewsInfo ? (
                <>
                  <li>
                    <Pagination size="small" className="flex-center" page={reviewsPage} onChange={handleReviewsPage} count={Math.ceil(reviewsInfo.total / 10)} color="primary" />
                  </li>
                  {reviewsInfo.results.map((review) => (
                    <Review review={review} key={review.id} />
                  ))}
                  <li>
                    <Pagination size="small" className="flex-center" page={reviewsPage} onChange={handleReviewsPage} count={Math.ceil(reviewsInfo.total / 10)} color="primary" />
                  </li>
                </>
              ) : (
                <ReviewSkeleton />
              )}
            </ul>
          </div>
          <div hidden={tab !== 1}>
            <ul className="list">
              {commentsInfo ? (
                <>
                  <li>
                    <Pagination size="small" className="flex-center" page={reviewsPage} onChange={handleCommentsPage} count={Math.ceil(commentsInfo.total / 10)} color="primary" />
                  </li>
                  {commentsInfo.results.map((comment, i) => (
                    <Comment ucomment={comment} key={i} />
                  ))}
                  <li>
                    <Pagination size="small" className="flex-center" page={reviewsPage} onChange={handleCommentsPage} count={Math.ceil(commentsInfo.total / 10)} color="primary" />
                  </li>
                </>
              ) : (
                <CommentSkeleton />
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
