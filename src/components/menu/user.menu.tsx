import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './menu.scss';
import { useDispatch } from 'react-redux';
import { deleteUserInfo } from '../../store/actions/user.action';
import { useHistory } from 'react-router';
import { NAV } from '../../utils/constant';

type Props = {
  user: User;
};

export default function UserMenu({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="user_menu">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <span>{user.name}</span>
        <img src={`https://secure.gravatar.com/avatar/${user.pfp}?s=28&r=pg&d=mp`} alt="avatar" />
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.PROFILE.link);
          }}
        >
          {NAV.PROFILE.name}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push(NAV.BOOKMARKS.link);
          }}
        >
          {NAV.BOOKMARKS.name}
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            deleteUserInfo(dispatch);
          }}
        >
          {NAV.LOGOUT.name}
        </MenuItem>
      </Menu>
    </div>
  );
}
