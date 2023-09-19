import { useEffect, useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import Search from '../../components/search/search';
import ThemeSwitch from '../../components/theme-switch/themeSwitch';
import { Divider, Drawer, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { NAV } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import UserMenu from '../../components/menu/user.menu';
import MoreMenu from '../../components/menu/more.menu';
import { Menu } from '@material-ui/icons';
import { getSearchNovelsInfo } from '../../store/actions/novels.action';
import { getUserInfo } from '../../store/actions/user.action';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const user = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const novels = useSelector((state: State) => state.searchNovels);
  useEffect(() => {
    getSearchNovelsInfo(dispatch);
    getUserInfo(dispatch);
  }, [dispatch]);
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const filteredSearch = novels.filter((novel) => {
    return novel.name?.toLowerCase()?.indexOf(searchInput.toLowerCase()) !== -1 || novel.cn_name?.toLowerCase()?.indexOf(searchInput.toLowerCase()) !== -1;
  });

  const SearchComponent = () => {
    return (
      <Search classes="scrollbar" getInput={(input: string) => setSearchInput(input)} placeholder="Search novels">
        <div className="search_content">
          <ul>
            {filteredSearch.map((novel) => (
              <li key={novel.id}>
                <Link id={novel.url} to={`/novels/${novel.url}`}>
                  <img src={process.env.PUBLIC_URL + `/media/novel/${novel.img}`} alt={`${novel.name}`} />
                  <p className="normal-font">
                    {novel.name}
                    <br />
                    <span className="cn"> {novel.cn_name}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Search>
    );
  };

  return (
    <header>
      <nav>
        <ul>
          <li className="menu">
            <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
              <List component="nav">
                <ListItem className="search">{SearchComponent()}</ListItem>
                <Link onClick={toggleDrawer(false)} id={NAV.NOVELS.name} to={NAV.NOVELS.link}>
                  <ListItem button>
                    <ListItemText primary={NAV.NOVELS.name}></ListItemText>
                  </ListItem>
                </Link>
                {/* {user && (
                  <>
                    <Link onClick={toggleDrawer(false)} id={NAV.GLOSSARY.name} to={NAV.GLOSSARY.link}>
                      <ListItem button>
                        <ListItemText primary={NAV.GLOSSARY.name}></ListItemText>
                      </ListItem>
                    </Link>
                    <Link onClick={toggleDrawer(false)} id={NAV.PROPOSITIONS.name} to={NAV.PROPOSITIONS.link}>
                      <ListItem button>
                        <ListItemText primary={NAV.PROPOSITIONS.name}></ListItemText>
                      </ListItem>
                    </Link>
                    <Link onClick={toggleDrawer(false)} id={NAV.REPORTS.name} to={NAV.REPORTS.link}>
                      <ListItem button>
                        <ListItemText primary={NAV.REPORTS.name}></ListItemText>
                      </ListItem>
                    </Link>
                  </>
                )} */}
                <Link onClick={toggleDrawer(false)} id={NAV.ABOUT.name} to={NAV.ABOUT.link}>
                  <ListItem button>
                    <ListItemText primary={NAV.ABOUT.name}></ListItemText>
                  </ListItem>
                </Link>
                {!user && (
                  <>
                    <Divider />
                    <Link onClick={toggleDrawer(false)} id={NAV.REGISTER.name} to={NAV.REGISTER.link}>
                      <ListItem button>
                        <ListItemText primary={NAV.REGISTER.name}></ListItemText>
                      </ListItem>
                    </Link>
                    <Link onClick={toggleDrawer(false)} id={NAV.LOGIN.name} to={NAV.LOGIN.link}>
                      <ListItem button>
                        <ListItemText primary={NAV.LOGIN.name}></ListItemText>
                      </ListItem>
                    </Link>
                  </>
                )}
              </List>
            </Drawer>
          </li>
          <li className="icon">
            <Link id={NAV.TITLE.name} to={NAV.TITLE.link}>
              <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="icon" />
            </Link>
          </li>
          <li>
            <strong>
              <Link id={NAV.TITLE.name} to={NAV.TITLE.link}>
                {NAV.TITLE.name}
              </Link>
            </strong>
          </li>
          <li className="pc ml-5">
            <Link id={NAV.NOVELS.name} to={NAV.NOVELS.link}>
              {NAV.NOVELS.name}
            </Link>
          </li>
          <li className="pc">
            <MoreMenu user={user} />
          </li>
          <li className="ml-auto pc">{SearchComponent()}</li>
          <li className="theme_switch">
            <ThemeSwitch />
          </li>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <li className="pc">
                <Link id={NAV.REGISTER.name} to={NAV.REGISTER.link}>
                  {NAV.REGISTER.name}
                </Link>
              </li>
              <li className="pc">
                <Link id={NAV.LOGIN.name} to={NAV.LOGIN.link}>
                  {NAV.LOGIN.name}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
