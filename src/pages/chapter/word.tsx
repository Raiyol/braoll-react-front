import { Tooltip, withStyles } from '@material-ui/core';
import { useState } from 'react';

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'var(--color-box)',
    color: 'var(--color-text)',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.175)',
    maxWidth: 200,
    fontSize: 15,
  },
  arrow: {
    color: 'var(--color-box)',
  },
}))(Tooltip);

type Props = {
  def: string;
  cn: string;
  py: string;
};

export default function Word({ def, cn, py }: Props) {
  const [open, setOpen] = useState(false);

  if (!py) {
    return <>{cn}</>;
  }

  if (!open) {
    <span onClick={() => setOpen(!open)}>{cn}</span>;
  }

  return (
    <HtmlTooltip
      interactive
      arrow
      placement="top"
      open={open}
      title={
        <div className="def">
          <span>{py}</span> <span>{def}</span>
        </div>
      }
    >
      <span className={open ? 'cn-box' : ''} onClick={() => setOpen(!open)}>
        {cn}
      </span>
    </HtmlTooltip>
  );
}
