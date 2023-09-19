import { SubmitHandler, useForm } from 'react-hook-form';
import AuthApi from '../services/auth.api';
import InputForm from '../components/form_input/input.form';
import { Button } from '@material-ui/core';
import CheckboxForm from '../components/form_checkbox/checkbox.form';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { openToast } from '../store/actions/toast.action';
import { setUserInfo } from '../store/actions/user.action';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [statusCode, setStatusCode] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
  document.title = 'Login - Broall';

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await AuthApi.postLoginForm(data);
      setStatusCode(response.status);
      setError(response.data.message ?? '');
      if (response.status !== 202) {
        const bookmarks: { [id_number: number]: number } = {};
        response.data.bookmarks.forEach((bookmark) => (bookmarks[bookmark.id_novel] = bookmark.chapter));
        setUserInfo(dispatch, { ...response.data, bookmarksObj: bookmarks });
      }
      history.push('/');
    } catch (error: any) {
      const errResponse = error.response as AxiosResponse;
      setError(errResponse.data.message ?? `${errResponse.status} ${errResponse.statusText}`);
    }
  };

  const resendMail = async () => {
    try {
      await AuthApi.resendConfirmMail();
      dispatch(openToast());
      setError('');
      setStatusCode(0);
    } catch (error: any) {
      const errResponse = error.response as AxiosResponse;
      setError(errResponse.data.message ?? `${errResponse.status} ${errResponse.statusText}`);
    }
  };

  return (
    <section className="form_style">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <p className="err">
            {error}{' '}
            {statusCode === 202 && (
              <Button style={{ margin: '0' }} color="primary" onClick={resendMail}>
                Resend
              </Button>
            )}
          </p>
        )}
        <InputForm
          errors={errors}
          name="email"
          options={{ required: true, pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i }}
          register={register}
          type="email"
          title="E-mail"
          autoComplete="username"
        />
        <InputForm errors={errors} name="password" options={{ required: true, minLength: 8, maxLength: 50 }} register={register} type="password" title="Password" autoComplete="current-password" />
        <CheckboxForm name="remember" register={register} title="Remember me"></CheckboxForm>
        <Button variant="contained" type="submit" color="primary">
          Log in
        </Button>
      </form>
    </section>
  );
}
