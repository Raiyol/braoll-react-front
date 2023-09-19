import { Button, withStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { useSelector } from 'react-redux';
import HiddenText from '../text/hiddentext';
import { useHistory } from 'react-router';
import './review.scss';
import { NAV } from '../../utils/constant';
import ReviewsApi from '../../services/reviews.api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  review: Review & User & Partial<Novel>;
};

const SmallerButton = withStyles(() => ({
  root: {
    maxWidth: '48px',
    minWidth: '48px',
  },
}))(Button);

export default function Review({ review }: Props) {
  const user = useSelector((state: State) => state.user);
  const [likes, setLikes] = useState(review.likes);
  const history = useHistory();

  const handleClick = () => {
    if (!user) {
      history.push(NAV.LOGIN.link);
      return;
    }
    if (review.liked) {
      ReviewsApi.deleteLikes(review.id);
      setLikes((prev) => prev - 1);
      review.liked = 0;
    } else {
      ReviewsApi.postLikes(review.id);
      setLikes((prev) => prev + 1);
      review.liked = 1;
    }
  };

  return (
    <li className="review">
      <div className="top">
        <div className="r-left">
          {review.pfp && <img src={`https://secure.gravatar.com/avatar/${review.pfp}?s=50&r=pg&d=mp`} alt="avatar" />}
          <div>
            <h4>{review.url ? <Link to={`/novels/${review.url}`}>{review.name}</Link> : review.name}</h4>
            <Rating defaultValue={review.rate} readOnly size="small" />
          </div>
        </div>
        <div className="r-right">
          <span>{DateTime.fromISO(review.date).toFormat('yyyy-MM-dd')}</span>
          <div>
            {likes}
            <SmallerButton onClick={handleClick} size="small" variant="outlined" color="primary">
              Like
            </SmallerButton>
          </div>
        </div>
      </div>
      {review.review && (
        <div className="content">
          <HiddenText content={review.review} type="text_para" limit={700} />
        </div>
      )}
    </li>
  );
}
