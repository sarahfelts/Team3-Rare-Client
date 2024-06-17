import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGameTypes, createGame, updateGame } from '../api/gameData';

const initialState = {
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: 1,
};

const GameForm = ({ user, game = null }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(game || initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes()
      .then((types) => {
        setGameTypes(types);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.uid]);

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
};

export default GameForm;
