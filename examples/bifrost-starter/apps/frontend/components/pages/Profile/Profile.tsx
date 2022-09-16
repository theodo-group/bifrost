import { useGetMe } from 'services/api/user/useUser';
import { ProfileForm } from './ProfileForm';

export const Profile = () => {
  const user = useGetMe();

  return (
    <>
      <h2>Here you can update your profile !</h2>
      {user && <ProfileForm user={user} />}
    </>
  );
};
