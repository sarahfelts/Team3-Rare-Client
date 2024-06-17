import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../api/eventData';
import { getGames } from '../api/gameData';

const initialState = {
  skillLevel: 'Beginner',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: 1,
};

const EventForm = ({ user }) => {
  const [game, setGame] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames()
      .then((name) => {
        setGame(name);
        console.log(name);// Log the fetched games
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.uid]);

  const handleChange = (e) => {
    setCurrentEvent({
      ...currentEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    const event = {
      description: currentEvent.maker,
      date: date.toISOString().split('T')[0],
      time: date.toISOString().split(' ')[0],
      userId: user.uid,
    };

    createEvent(event).then(() => router.push('/'));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="gameType"
            value={currentEvent.gameType}
            onChange={handleChange}
          >
            {game.map((gameItem) => (
              <option key={gameItem.id} value={gameItem.id}>
                {gameItem.name}  {/* Display the name of the game */}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Organizer</Form.Label>
          <Form.Select
            name="organizer"
            value={currentEvent.organizer}
            onChange={handleChange}
          >
            {game.map((gamerItem) => (
              <option key={gamerItem.id} value={gamerItem.id}>
                {gamerItem.uid}  {/* Assuming 'uid' is the property holding the gamer's name */}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit!
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
