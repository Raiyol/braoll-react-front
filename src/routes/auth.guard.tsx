import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: FC<any>;
  [prop: string]: any;
};

export function AuthGuardRoute({ component: Component, ...rest }: Props) {
  const auth = useSelector((state: State) => state.user);
  const triedLogin = useSelector((state: State) => state.triedLogin);
  return <Route {...rest} render={(props) => (auth || !triedLogin ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export function NotAuthGuardRoute({ component: Component, ...rest }: Props) {
  const auth = useSelector((state: State) => state.user);
  return <Route {...rest} render={(props) => (!auth ? <Component {...props} /> : <Redirect to="/" />)} />;
}
