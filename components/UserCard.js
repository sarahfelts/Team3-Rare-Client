import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { deleteUser } from './api/userData';

const UserCard = ({
  id,
  first_name,
  last_name,
  bio,
  profile_image_url,
  email,
  created_on,
  active,
  is_staff,
  username,
  onUpdate,
  singleUserView,
}) => {
  const deleteThisUser = () => {
    if (window.confirm(`Delete ${first_name} ${last_name}?`)) {
      deleteUser(id).then(() => {
        onUpdate();
      });
    }
  };
  

  return (
    <Card className="text-center">
      <Card.Header>Name:{first_name} {last_name}</Card.Header>
      {singleUserView && <Card.Header>username:{username}</Card.Header>}
      <Card.Body>
        <Card.Title>Email: {email}</Card.Title>
        <Card.Text>Bio: {bio}</Card.Text>
        <Card.Img id={`profile-image-${id}`} variant="top" src={profile_image_url} />
      </Card.Body>
      <Card.Footer className="text-muted">
        Created On: {created_on}<br/>
        Active: {active ? 'Yes' : 'No'}<br/>
        Is Staff: {is_staff ? 'Yes' : 'No'}
      </Card.Footer>
      <Button onClick={deleteThisUser}>Delete User</Button>
      <Link href={`/users/${id}`} passHref>
        <Button>View User</Button>
      </Link>
    </Card>
  );
};

UserCard.propTypes = {
  id: PropTypes.number.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  profile_image_url: PropTypes.string,
  email: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  is_staff: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  singleUserView: PropTypes.bool, // new prop
};

export default UserCard;