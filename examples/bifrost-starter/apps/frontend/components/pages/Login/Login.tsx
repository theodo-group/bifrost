'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from 'components/atoms/forms/Input/Input';
import { PasswordInput } from 'components/atoms/forms/PasswordInput/PasswordInput';
import { Pages } from 'constant';
import { useApiClient } from 'providers/swr-provider';
import { login, LoginData } from 'services/api/auth/login';

import style from './Login.module.css';

export const Login: FC = () => {
  const t = useTranslations('login');

  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginData>();
  const apiClient = useApiClient();

  const onSubmit = (data: LoginData) => {
    return login(apiClient, data)
      .then(() => router.push(Pages.Home))
      .catch((e: Response) => {
        console.log(e);
      });
  };

  return (
    <main>
      <div className={style.container}>
        <h1>{t('title')}</h1>
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
              label={t('email.label')}
              placeholder={t('email.placeholder')}
              {...register('email', {
                required: t('email.error.required'),
                pattern: {
                  value: /^\S+@\S+\.\S+$/, // basic email regex
                  message: t('email.error.invalid'),
                },
              })}
            />
          </div>
          <div>
            <PasswordInput
              id="login.password"
              autoComplete="current-password"
              label={t('password.label')}
              placeholder={t('password.placeholder')}
              {...register('password', {
                required: t('password.error.required'),
              })}
            />
          </div>
          <button type="submit" className={style.submit}>
            {t('submit')}
          </button>
        </form>
      </div>
    </main>
  );
};
