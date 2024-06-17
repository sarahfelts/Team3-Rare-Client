import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes, updateGame } from '../api/gameData';

const initialState = {
  skillLevel: 'Beginner',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: 1,
};

const GameForm = ({ user, game = null }) => {
  console.warn('Game', game);
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(game || initialState);
  const router = useRouter();

  // Existing useEffect for fetching game types
  useEffect(() => {
    if (user && user.uid) {
      getGameTypes()
        .then((types) => {
          setGameTypes(types);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  // New useEffect for updating currentGame when game prop changes
  useEffect(() => {
    setCurrentGame(game || initialState);
  }, [game]);

  const handleChange = (e) => {
    setCurrentGame({
      ...currentGame,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gameToSave = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: currentGame.numberOfPlayers,
      skillLevel: currentGame.skillLevel,
      gameType: currentGame.gameType,
      userId: user.uid,
    };

    if (game) {
      // If `game` is defined, update the existing game
      updateGame(game.id, gameToSave).then(() => router.push('/'));
    } else {
      // If `game` is not defined, create a new game
      createGame(gameToSave).then(() => router.push('/'));
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="gameType"
            value={currentGame.gameType}
            onChange={handleChange}
          >
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Number of Players</Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          <Form.Label>Skill Level </Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit!
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  game: PropTypes.shape({
    id: PropTypes.string,
    maker: PropTypes.string,
    title: PropTypes.string,
    numberOfPlayers: PropTypes.string,
    skillLevel: PropTypes.string,
    gameType: PropTypes.number,
  }),
};

GameForm.defaultProps = {
  game: null,
};

export default GameForm;
