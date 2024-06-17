import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteGame } from './api/gameData'; // Changed from deleteReview

const GameCard = ({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => { // Use the id from the URL
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
  numberOfPlayers: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,

  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
