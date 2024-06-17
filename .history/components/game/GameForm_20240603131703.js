import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createGame, getGameTypes, getGame, updateGame,

} from '../api/gameData';

const initialState = {
  skill_level: 'Beginner',
  number_of_players: '',
  title: '',
  maker: '',
  gameType: 1,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { query } = useRouter();
  const { id } = query;

  // First useEffect to fetch the game data and game types
  useEffect(() => {
    if (id) {
      // Fetch the game and set it to currentGame
      getGame(id)
        .then((game) => {
          console.warn('Game', game);
          setCurrentGame(game);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Set currentGame to initialState
      setCurrentGame(initialState);
    }

    getGameTypes()
      .then((types) => {
        setGameTypes(types);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, user.uid]);

  // Second useEffect to log the currentGame state
  useEffect(() => {
    console.warn('Current Game', currentGame);
  }, [currentGame]);

  const handleChange = (e) => {
    setCurrentGame({
      ...currentGame,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: currentGame.numberOfPlayers,
      skillLevel: currentGame.skillLevel,
      gameType: currentGame.gameType,
      userId: user.uid,
    };

    if (id) {
      // Update the game
      updateGame(id, game)
        .then(() => {
          router.push(`/games/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Create the game
      createGame(game)
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{currentGame.id ? 'Update' : 'Create'} Game</h2>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={currentGame.title}
            onChange={handleChange}
            required
          />

          <Form.Label>Game Type</Form.Label>
          <Form.Select
            name="game_type"
            value={currentGame.game_type}
            onChange={handleChange}
          >
            {gameTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label}
              </option>
            ))}
          </Form.Select>

          <Form.Label>Maker</Form.Label>
          <Form.Control
            name="maker"
            value={currentGame.maker}
            onChange={handleChange}
            required
          />

          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            name="numberOfPlayers"
            value={currentGame.numberOfPlayers}
            onChange={handleChange}
            required
          />

          <Form.Label>Skill Level </Form.Label>
          <Form.Control
            name="skillLevel"
            value={currentGame.skill_Level}
            onChange={handleChange}
            required
          />
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
};

export default GameForm;
