'use client';

import { GetUserDto } from '@bifrost-starter/interfaces';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from 'components/atoms/forms/Input/Input';
import { Pages } from 'constant';
import { useApiClient } from 'providers/swr-provider';
import { updateMe, useGetMe } from 'services/api/user/useUser';

import style from './ProfileForm.module.css';

type ProfileProps = {
  user: GetUserDto;
};

export type UserData = {
  name: string;
};

export const ProfileForm: FC = () => {
  const { user, isLoading } = useGetMe();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Seems you are not logged in</div>;
  }

  return <ProfileFormWithUser user={user} />;
};

const ProfileFormWithUser: FC<ProfileProps> = ({ user }) => {
  const t = useTranslations('profile');

  const router = useRouter();
  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: {
      name: user.name,
    },
  });
  const apiClient = useApiClient();
  const onSubmit = (data: UserData) => {
    return updateMe(apiClient, data)
      .then(() => router.push(Pages.Home))
      .catch((e: Response) => {
        console.log(e);
      });
  };

  return (
    <form
      className={style.form}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="user.name"
        type="text"
        label={t('name.label')}
        {...register('name', {
          required: t('name.error.required'),
        })}
      />

      <button type="submit" className={style.submit}>
        {t('submit')}
      </button>
    </form>
  );
};
