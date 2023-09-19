import { Skeleton } from '@material-ui/lab';

export default function ReviewSkeleton() {
  return (
    <li className="review">
      <div className="top">
        <div className="r-left">
          <Skeleton variant="rect" height={50} width={50} />
          <div>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="rect" width={100} />
          </div>
        </div>
        <div className="r-right">
          <Skeleton variant="text" width={100} />
          <Skeleton variant="rect" width={100} height={20} />
        </div>
      </div>
      <div className="content">
        <Skeleton variant="rect" height={250} />
      </div>
    </li>
  );
}
