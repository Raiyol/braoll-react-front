import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './menu.scss';
import { useHistory } from 'react-router';
import { NAV } from '../../utils/constant';
import { Link } from 'react-router-dom';

type Props = {
  user?: User;
};

export default function MoreMenu({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // return user ? (
  return false ? (
    <>
      <Button aria-controls="simple-menu" className="more" aria-haspopup="true" onClick={handleClick}>
        <span className="normal-font">More</span>
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.GLOSSARY.link);
          }}
        >
          {NAV.GLOSSARY.name}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.PROPOSITIONS.link);
          }}
        >
          {NAV.PROPOSITIONS.name}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.REPORTS.link);
          }}
        >
          {NAV.REPORTS.name}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.ABOUT.link);
          }}
        >
          {NAV.ABOUT.name}
        </MenuItem>
      </Menu>
    </>
  ) : (
    <Link id={NAV.ABOUT.name} to={NAV.ABOUT.link}>
      {NAV.ABOUT.name}
    </Link>
  );
}
