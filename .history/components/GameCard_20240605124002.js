import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteGame } from './api/gameData';

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => {
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
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.string.isRequired,
  skillLevel: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;

//  TODO: need to fix url not routing to game id"
