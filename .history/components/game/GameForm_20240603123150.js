import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import {
  createGame, getGameTypes, updateGame,
} from '../api/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: '',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: '',
};

function GameForm({ obj, id }) {
  const [formInput, setFormInput] = useState(obj);
  const [gameTypes, setGameTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.firebaseKey) {
      updateGame(formInput).then(() => router.push(`/games/${formInput.id}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createGame(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateGame(patchPayload).then(() => {
          router.push(`/game/${id}`);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{formInput.id ? 'Update' : 'Create'} Game</h2>

      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Chutes and Ladders"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Game Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Game Type"
          name="gameType"
          value={formInput.gameType}
          onChange={handleChange}>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
          required
        </Form.Control>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Maker" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Milton Bradley"
          name="maker"
          value={formInput.maker}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Number of Players" className="mb-3">
        <Form.Control
          type="text"
          placeholder="2"
          name="numberOfPlayers"
          value={formInput.numberOfPlayers}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput5" label="Skill Level" className="mb-3">
        <Form.Control
          type="text"
          placeholder="easy"
          name="skillLevel"
          value={formInput.skillLevel}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <Button type="submit">{id ? 'Update' : 'Create'} Game</Button>
    </Form>
  );
};

GameForm.propTypes = {
  obj: PropTypes.shape({
    skillLevel: PropTypes.string,
    numberOfPlayers: PropTypes.string,
    title: PropTypes.string,
    maker: PropTypes.string,
    gameType: PropTypes.string,
  }),
  id: PropTypes.string,
};

GameForm.defaultProps = {
  obj: initialState,
  id: '',
};

export default GameForm;
