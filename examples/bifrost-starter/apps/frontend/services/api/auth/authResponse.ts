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
  typeof response === 'object' &&
  !!response &&
  ('access' in response || 'token' in response);
