import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const GameCard = ({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  id,
  deleteReview, // Add this prop
  reviewObj, // Add this prop
  onUpdate, // Add this prop
}) => {
  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.address}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Link href={`/games/edit/${id}`} passHref>
        <Button>Edit Game</Button>
      </Link>
      <Link href={`/games/${id}`} passHref>
        <Button>View Game</Button>
      </Link>
      <Button onClick={deleteThisReview}>Delete Review</Button> {/* Add this line */}
    </Card>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  deleteReview: PropTypes.func.isRequired, // Add this line
  reviewObj: PropTypes.object.isRequired, // Add this line
  onUpdate: PropTypes.func.isRequired, // Add this line
};

export default GameCard;