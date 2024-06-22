import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import RegisterForm from '../../../components/RegisterForm';
import { getSingleUser, updateUser as apiUpdateUser } from '../../../components/api/userData';

export default function EditUser() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

useEffect(() => {
  if (id && !isNaN(id)) {
    getSingleUser(id)
      .then((data) => {
        setEditUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }
}, [id]);

  const updateUser = (id, user) => {
    apiUpdateUser(id, user)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  console.log({ user: editUser, updateUser, isEditing: true, id });
return (
  id ? <RegisterForm user={editUser} updateUser={updateUser} isEditing={true} id={id} /> : 'Loading...'
);
}