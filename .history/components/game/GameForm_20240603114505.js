import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import {
  createGame, getGameTypes, updateGame, getGame,

} from '../api/gameData';

const initialState = {
  skillLevel: 'Beginner',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: '',
};

const GameForm = ({ user, id }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    if (id) {
      getGame(id).then((gameDetails) => {
        setCurrentGame(gameDetails);
        setLoading(false);
      });
    } else {
      setCurrentGame(initialState);
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

    if (id) {
      updateGame(id, gameToSave).then(() => router.push(`/game/${id}`));
    } else {
      createGame(gameToSave).then((newGameId) => router.push(`/game/${newGameId}`));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form onSubmit={handleSubmit}>
      <h2>{id ? 'Update' : 'Create'} Game</h2>
      <Form.Control name="title" required value={currentGame.title || ''} onChange={handleChange} disabled={loading} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Game Type" className="mb-3">
        <Form.Select name="gameType" value={currentGame.gameType || ''} onChange={handleChange}>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Maker" className="mb-3">
        <Form.Control name="maker" required value={currentGame.maker || ''} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput4" label="Number of Players" className="mb-3">
        <Form.Control name="numberOfPlayers" required value={currentGame.numberOfPlayers || ''} onChange={handleChange} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput5" label="Skill Level" className="mb-3">
        <Form.Control name="skillLevel" required value={currentGame.skillLevel || ''} onChange={handleChange} />
      </FloatingLabel>
      <Button type="submit">{id ? 'Update' : 'Create'} Game</Button>
    </Form>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string,
};

GameForm.defaultProps = {
  id: '',
};

export default GameForm;
