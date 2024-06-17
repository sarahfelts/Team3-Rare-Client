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
  deleteGame, // Changed from deleteReview
  onUpdate, // This function should trigger a re-render to update the list of games
}) => {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) { // Changed from GameCard.id to title
      deleteGame(id).then(() => { // Changed from deleteReview(GameCard.id) to deleteGame(id)
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
      <Button onClick={deleteThisGame}>Delete Game</Button> {/* Changed from Delete Review to Delete Game */}
    </Card>
  );
};

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  deleteGame: PropTypes.func.isRequired, // Changed from deleteReview
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
