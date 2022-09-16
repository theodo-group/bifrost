import { NextPage } from 'next/types';
import Head from 'next/head';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { login, LoginData } from 'services/api/auth/login';
import { Pages } from 'constant';
import { Input, PasswordInput } from 'components/atoms';
import style from './Login.module.css';

export const Login: NextPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => {
    return login(data)
      .then(() => router.push(Pages.Home))
      .catch((e: Response) => {
        console.log(e);
      });
  };

  return (
    <main>
      <Head>
        <meta name="description" content="login" />
        <title>Login | Bifrost</title>
      </Head>
      <div className={style.container}>
        <h1>
          <FormattedMessage id="login.title" />
        </h1>
        <form
          className={style.form}
          method="post"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              id="login.email"
              type="email"
              autoComplete="email"
              label={intl.formatMessage({
                id: 'login.email.label',
              })}
              placeholder={intl.formatMessage({
                id: 'login.email.placeholder',
              })}
              {...register('email', {
                required: intl.formatMessage({
                  id: 'login.email.error.required',
                }),
                pattern: {
                  value: /^\S+@\S+\.\S+$/, // basic email regex
                  message: intl.formatMessage({
                    id: 'login.email.error.invalid',
                  }),
                },
              })}
            />
          </div>
          <div>
            <PasswordInput
              id="login.password"
              autoComplete="current-password"
              label={intl.formatMessage({
                id: 'login.password.label',
              })}
              placeholder={intl.formatMessage({
                id: 'login.password.placeholder',
              })}
              {...register('password', {
                required: intl.formatMessage({
                  id: 'login.password.error.required',
                }),
              })}
            />
          </div>
          <button type="submit" className={style.submit}>
            <FormattedMessage id="login.submit" />
          </button>
        </form>
      </div>
    </main>
  );
};
