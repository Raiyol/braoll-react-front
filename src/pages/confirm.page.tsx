import { Skeleton } from '@material-ui/lab';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import AuthApi from '../services/auth.api';

export default function Confirm() {
  const token = new URLSearchParams(useLocation().search).get('token');
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = 'Confirm - Broall';
    if (token) {
      AuthApi.validateMail(token)
        .then((response) => {
          setMessage(response.data.message);
        })
        .catch((error) => {
          const errResponse = error.response as AxiosResponse;
          if (errResponse.data.message) {
            setMessage(errResponse.data.message);
          } else {
            setMessage(`${errResponse.status} ${errResponse.statusText}`);
          }
        })
        .finally(() => setLoading(false));
    } else {
      history.push('/');
    }
  }, [token, history]);
  return <section className="card">{loading ? <Skeleton /> : <p>{message ? message : 'You e-mail has been confirmed, you can now log in.'}</p>}</section>;
}
