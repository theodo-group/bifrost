import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import router from 'next/router';
import { Input } from 'components/atoms';
import { updateMe, User } from 'services/api/user/useUser';
import { Pages } from 'constant';
import style from './ProfileForm.module.css';

type ProfileProps = {
  user: User;
};
export type UserData = {
  name: string;
};

export const ProfileForm = ({ user }: ProfileProps) => {
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
