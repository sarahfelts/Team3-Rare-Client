import { useState, useEffect } from 'react';
import UserCard from '../components/cards/UserCard';
import { getUsers } from '../components/api/userData';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

return (
  <article className="users">
    <h1>Users</h1>
    {users.map((user) => (
      <section key={`user--${user.id}`} className="user">
        <UserCard {...user} allUsersView={true}
          id={user.id.toString()}
          first_name={user.first_name}
          last_name={user.last_name}
          bio={user.bio}
          profile_image_url={user.profile_image_url}
          email={user.email}
          created_on={user.created_on}
          active={user.active}
          is_staff={user.is_staff}
          onUpdate={() => window.location.reload()}
        />
      </section>
    ))}
  </article>
);
}

export default Home;
