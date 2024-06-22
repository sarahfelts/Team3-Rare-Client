import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { deletePost } from '../../utils/data/postData';

export default function PostCard({ obj, userId, onUpdate }) {
  const { user } = useAuth();

  const isCurrentUserPost = user && user.id === userId.id;

  const deleteThisPost = (id) => {
    if (window.confirm('Delete Post?')) {
      deletePost(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="myCard">
      {isCurrentUserPost ? (
        <Button className="delete-btn" onClick={() => deleteThisPost(obj.id)}>
          x
        </Button>
      ) : null}
      <Link href={`/posts/${obj.id}`} passHref>
        <Card.Body style={{ cursor: 'pointer' }}>
          <Image className="post-img" src={obj.image_url} alt={obj.title} fluid />
          <Card.Title className="post-title-link">{obj.title}</Card.Title>
          <Card.Text className="post-user-link">
            by {obj.rare_user.first_name} {obj.rare_user.last_name}
          </Card.Text>
          <Card.Text className="post-date">Posted on: {obj.publication_date}</Card.Text>
          <Card.Text className="comment-count">{obj.comment_count} Comments</Card.Text>
        </Card.Body>
      </Link>
      <Button className="reaction-btn" onClick={() => alert('Reactions not implemented yet')}>
        Reaction Count: {obj.reaction_count}
      </Button>
    </Card>
  );
}

PostCard.propTypes = {
  userId: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    publication_date: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    reaction_count: PropTypes.number.isRequired, // Add reaction_count here
    rare_user: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
