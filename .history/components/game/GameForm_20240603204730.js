// Importing necessary modules and functions
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  createGame, getGameTypes, getGame, updateGame,
} from '../api/gameData';

// Initial state for the form
const initialState = {
  skill_level: 'Beginner',
  number_of_players: '',
  title: '',
  maker: '',
  gameType: 1,
};

// The GameForm component
const GameForm = ({ user }) => {
  // State for game types and the current game
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);

  // Getting the router and query object
  const router = useRouter();
  const { query } = useRouter();
  const { id } = query;

  // useEffect hook to fetch the game data and game types
  useEffect(() => {
    if (id) {
      // If an id is present, fetch the game and set it to currentGame
      getGame(id)
        .then((game) => {
          setCurrentGame(game);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // If no id is present, set currentGame to initialState
      setCurrentGame(initialState);
    }

    // Fetch the game types
    getGameTypes()
      .then((types) => {
        setGameTypes(types);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, user.uid]);

  // useEffect hook to log the currentGame state
  useEffect(() => {
    console.warn('Current Game', currentGame);
  }, [currentGame]);

  // Function to handle form field changes
  const handleChange = (e) => {
    setCurrentGame({
      ...currentGame,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the game object
    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      number_of_players: currentGame.number_of_players,
      skill_level: currentGame.skill_level,
      game_type: currentGame.game_type,
      userId: user.uid,
    };

    if (id) {
      // If an id is present, update the game
      updateGame(id, game)
        .then(() => {
          router.push(`/games/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // If no id is present, create a new game
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
            name="number_of_players"
            value={currentGame.number_of_players}
            onChange={handleChange}
            required
          />

          <Form.Label>Skill Level </Form.Label>
          <Form.Control
            name="skill_level"
            value={currentGame.skill_level}
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

// Prop types for the GameForm component
GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
