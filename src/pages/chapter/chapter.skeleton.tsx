import { Skeleton } from '@material-ui/lab';
import { Fragment } from 'react';

export default function ChapterSkeleton() {
  const navigation = () => (
    <div className="navigate">
      <div className="button">
        <Skeleton variant="rect" height={36} />
      </div>
      <Skeleton variant="rect" height={36} width={64} />
      <div className="button">
        <Skeleton variant="rect" height={36} />
      </div>
    </div>
  );

  return (
    <section className="chapter">
      <div className="title">
        <Skeleton variant="text" />
        <h2>
          <Skeleton variant="text" height={32} />
        </h2>
      </div>
      <div className="chapter_actions">
        <Skeleton variant="rect" height={49} width={239} />
      </div>
      {navigation()}
      <div className="content">
        {[0, 1, 2, 3, 4].map((num) => (
          <Fragment key={num}>
            <p>
              <Skeleton variant="rect" height={72} />
            </p>
            <p>
              <Skeleton variant="rect" height={48} />
            </p>
          </Fragment>
        ))}
      </div>
      {navigation()}
    </section>
  );
}
