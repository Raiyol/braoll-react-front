import { BaseApiService } from './base.api';

export default class AuthApi extends BaseApiService {
  static baseUrl = 'auth';

  static async postRegisterForm(registerForm: RegisterForm) {
    return this.post('register', registerForm);
  }

  static async validateMail(token: string) {
    return this.get<SimpleResponseContent>('confirm', { token });
  }

  static async postLoginForm(loginForm: LoginForm) {
    return this.post<SimpleResponseContent & User>('login', loginForm);
  }

  static async resendConfirmMail() {
    return this.get('resend');
  }

  static async logout() {
    return this.get('logout');
  }
}
