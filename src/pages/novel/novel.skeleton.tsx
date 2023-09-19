import { Skeleton } from '@material-ui/lab';
import { useMediaQuery } from '@material-ui/core';

export default function NovelSkeleton() {
  const matchesIpad = useMediaQuery('(max-width:767px)');

  const left = () => (
    <>
      <Skeleton className="img" variant="rect" height={256} width={192} />
      <div className="genres">
        <h4>
          <Skeleton variant="text" />
        </h4>
        <Skeleton variant="text" height={16} />
      </div>
      <div className="rating">
        <h4>
          <Skeleton variant="text" />
        </h4>
        <Skeleton variant="rect" height={30} />
      </div>
      <div className="info">
        <h4>
          <Skeleton variant="text" />
        </h4>
        <Skeleton variant="text" height={16} />
      </div>
      <div className="info">
        <h4>
          <Skeleton variant="text" />
        </h4>
        <Skeleton variant="text" height={16} />
      </div>
      <div className="info">
        <h4>
          <Skeleton variant="text" />
        </h4>
        <Skeleton variant="text" height={16} />
      </div>
      <Skeleton variant="rect" height={206} />
    </>
  );

  const right = () => (
    <>
      <div className="title">
        <h2>
          <Skeleton variant="text" />
        </h2>
        <h5>
          <Skeleton variant="text" />
        </h5>
      </div>
      <div className="summary">
        <Skeleton variant="rect" height={191.5} />
      </div>
      <div className="chapters">
        <Skeleton variant="rect" height={500} />
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
