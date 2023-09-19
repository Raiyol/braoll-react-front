import { Skeleton } from '@material-ui/lab';

export default function CommentSkeleton() {
  return (
    <li className="comment">
      <Skeleton variant="rect" height={50} width={50} />
      <div className="right full-width">
        <div className="top">
          <h4>
            <Skeleton variant="text" width={50} />
          </h4>
          <span>
            <Skeleton variant="text" width={125} />
          </span>
        </div>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </li>
  );
}
