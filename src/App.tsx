import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './layout/header/header';
import Register from './pages/register.page';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/reducers/reducers';
import SuccessToast from './components/toast/success.toast';
import Confirm from './pages/confirm.page';
import Login from './pages/login.page';
import { NotAuthGuardRoute, AuthGuardRoute } from './routes/auth.guard';
import Home from './pages/home/home.page';
import { NAV } from './utils/constant';
import Novels from './pages/novels/novels.page';
import Novel from './pages/novel/novel.page';
import NotFound from './pages/not_found/not_found.page';
import Chapter from './pages/chapter/chapter.page';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './utils/theme';
import About from './pages/about/about.page';
import BookmarksPage from './pages/bookmarks/bookmarks.page';
import UserPage from './pages/user/user.page';

const store = createStore(reducers, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
          <main className="body">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path={NAV.ABOUT.link} exact component={About} />
              <NotAuthGuardRoute path={NAV.REGISTER.link} exact component={Register} />
              <NotAuthGuardRoute path="/register/confirm" exact component={Confirm} />
              <NotAuthGuardRoute path={NAV.LOGIN.link} exact component={Login} />
              <AuthGuardRoute path={NAV.BOOKMARKS.link} exact component={BookmarksPage} />
              <AuthGuardRoute path={NAV.PROFILE.link} exact component={UserPage} />
              <Route path={NAV.NOVELS.link} exact component={Novels} />
              <Route path={NAV.NOVELS.link + '/:url'} exact component={Novel} />
              <Route path={NAV.NOVELS.link + '/:url/chapters/:num'} exact component={Chapter} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <SuccessToast />
        </ThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
