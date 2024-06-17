import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';  // Import Button from react-bootstrap
import Link from 'next/link';  // Import Link from next/link

const GameCard = ({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  firebaseKey,  // Add firebaseKey to the props
}) => (
  <Card className="text-center">
    <Card.Header>{title}</Card.Header>
    <Card.Body>
      <Card.Title>By: {maker}</Card.Title>
      <Card.Text>{numberOfPlayers} players needed</Card.Text>
    </Card.Body>
    <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    <Link href={`/games/edit/${firebaseKey}`} passHref>
      <Button>Edit Game</Button>
    </Link>
  </Card>
);

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  firebaseKey: PropTypes.string.isRequired,
};

export default GameCard;
