import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../components/api/userData';
import UserCard from '../../components/UserCard';

export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      getSingleUser(id)
        .then((userData) => {
            console.warn('Single User Data', userData);
          setUser(userData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

    return user ? (
      <UserCard {...user} singleUserView={true} 
        full_name={user.full_name}
        profile_image_url={user.profile_image_url}
        email={user.email}
        created_on={user.created_on}
        user_profile_type={user.user_profile_type}
        onUpdate={() => window.location.reload()}/>
    ) : (
      <div>Loading...</div>
    );
}