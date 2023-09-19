import { Button } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import { createRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import InputForm from '../components/form_input/input.form';
import AuthApi from '../services/auth.api';
import { openToast } from '../store/actions/toast.action';

export default function Register() {
  const [captcha, setCaptcha] = useState<null | string>('');
  const [error, setError] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();
  const recaptchaRef = createRef<ReCAPTCHA>();

  const [password, confirmPassword] = watch(['password', 'confirmPassword']);

  document.title = 'Register - Broall';

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    setError('');
    if (captcha === '' || captcha === null) {
      setCaptcha(null);
    } else {
      data.captcha = captcha ?? '';
      try {
        await AuthApi.postRegisterForm({ ...data, confirmPassword: undefined });
        history.push('/');
        dispatch(openToast());
      } catch (error: any) {
        recaptchaRef.current?.reset();
        const errResponse = error.response as AxiosResponse;
        setError(errResponse.data.message ?? `${errResponse.status} ${errResponse.statusText}`);
      }
    }
  };

  return (
    <section className="form_style">
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="err">{error}</p>}
        <InputForm errors={errors} name="name" options={{ required: true, minLength: 3, maxLength: 16 }} register={register} type="text" title="Username" />
        <InputForm
          errors={errors}
          name="email"
          options={{ required: true, pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i }}
          register={register}
          type="email"
          title="E-mail"
          autoComplete="username"
        />
        <InputForm errors={errors} name="password" options={{ required: true, minLength: 8, maxLength: 50 }} register={register} type="password" title="Password" autoComplete="new-password" />
        <InputForm
          errors={errors}
          name="confirmPassword"
          options={{ required: true, minLength: 8, maxLength: 50 }}
          register={register}
          type="password"
          title="Confirm Password"
          autoComplete="new-password"
          customError={password === confirmPassword ? undefined : 'Passwords does not match'}
        />
        <div className="captcha">
          <ReCAPTCHA sitekey="6Ldl0ewUAAAAAESLt29g9w1xavLAO7EvHTzc48gh" onChange={(value: any) => setCaptcha(value)} ref={recaptchaRef} />
          {captcha === null && <p className="err">You must check captcha</p>}
        </div>
        <Button variant="contained" type="submit" color="primary">
          Register
        </Button>
      </form>
    </section>
  );
}
