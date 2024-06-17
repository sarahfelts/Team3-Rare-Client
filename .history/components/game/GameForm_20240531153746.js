import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createGame, getGameTypes } from '../API/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

useEffect(() => {
  getGameTypes()
    .then((types) => {
      console.warn('Game types', types);
      setGameTypes(types);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  const handleChange = (e) => {
    setCurrentGame({
      ...currentGame,
      [e.target.name]: e.target.value,
    });
    console.log(currentGame);
  };

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submitting', currentGame);

  const game = {
    maker: currentGame.maker,
    title: currentGame.title,
    numberOfPlayers: Number(currentGame.numberOfPlayers),
    skillLevel: Number(currentGame.skillLevel),
    gameType: currentGame.gameType,
    userId: user.uid,
  };

  // Send POST request to your API
  createGame(game).then(() => router.push('/games'));
};

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
          <Form.Label>Game Type</Form.Label>
          <Form.Select name="gameType" required value={currentGame.gameType} onChange={handleChange}>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
          </Form.Select>
          <Form.Label>Maker</Form.Label>
          <Form.Control name="maker" required value={currentGame.maker} onChange={handleChange} />
          <Form.Label>Number of Players </Form.Label>
          <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          <Form.Label>Skill Level </Form.Label>
          <Form.Control name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
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
