type LoginResponse =
  | {
      access: string;
      token: undefined;
    }
  | {
      token: string;
      access: undefined;
    };

export const isLoginResponse = (response: unknown): response is LoginResponse =>
  !!response &&
  typeof response === 'object' &&
  ('access' in response || 'token' in response);
