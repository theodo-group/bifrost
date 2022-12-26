import { GetUserDto } from '@bifrost-starter/interfaces';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Input } from 'components/atoms';
import { Pages } from 'constant';
import { updateMe } from 'services/api/user/useUser';

import style from './ProfileForm.module.css';

type ProfileProps = {
  user: GetUserDto;
};

export type UserData = {
  name: string;
};

export const ProfileForm = ({ user }: ProfileProps): JSX.Element => {
  const intl = useIntl();
  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: {
      name: user.name,
    },
  });
  const onSubmit = (data: UserData) => {
    return updateMe(data)
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
        label={intl.formatMessage({
          id: 'profile.name.label',
        })}
        {...register('name', {
          required: intl.formatMessage({
            id: 'profile.name.error.required',
          }),
        })}
      />

      <button type="submit" className={style.submit}>
        <FormattedMessage id="profile.submit" />
      </button>
    </form>
  );
};
