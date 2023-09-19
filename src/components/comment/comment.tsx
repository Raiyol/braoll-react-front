import { DateTime } from 'luxon';
import HiddenText from '../text/hiddentext';
import { Link } from 'react-router-dom';
import './comment.scss';

type Props = {
  ucomment: UserComment & { url?: string };
};

export default function Comment({ ucomment }: Props) {
  return (
    <li className="comment">
      {ucomment.pfp && <img src={`https://secure.gravatar.com/avatar/${ucomment.pfp}?s=50&r=pg&d=mp`} alt="avatar" />}
      <div className="right">
        <div className="top">
          <h4>{ucomment.url ? <Link to={`/novels/${ucomment.url}`}>{ucomment.name}</Link> : ucomment.name}</h4>
          {!ucomment.url && <span>({DateTime.fromISO(ucomment.date).toFormat('yyyy-MM-dd HH:mm:ss')})</span>}
        </div>
        <HiddenText content={ucomment.comment} type="text_para" limit={700} />
        {ucomment.url && <span>({DateTime.fromISO(ucomment.date).toFormat('yyyy-MM-dd HH:mm:ss')})</span>}
      </div>
    </li>
  );
}
