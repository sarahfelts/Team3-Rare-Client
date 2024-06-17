import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent } from '../api/eventData';
import { getGames } from '../api/gameData';
import getGamers from '../api/gamerData';

const initialState = {
  skillLevel: 'Beginner',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: 1,
  date: '',
  time: '',
};

const EventForm = ({ user }) => {
  const [game, setGame] = useState([]);
  const [gamers, setGamers] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames()
      .then((fetchedGames) => {
        setGame(fetchedGames);
      })
      .catch((error) => {
        console.error(error);
      });

    getGamers()
      .then((fetchedGamers) => {
        setGamers(fetchedGamers);
        console.warn(fetchedGamers);
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

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
      gameId: currentEvent.gameType,
    };

    createEvent(event).then(() => router.push('/event'));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" required value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" required value={currentEvent.time} onChange={handleChange} />
          <Form.Label>Game</Form.Label>
          <Form.Select
            name="gameType"
            value={currentEvent.gameType}
            onChange={handleChange}
          >
            {game.map((gameItem) => (
              <option key={gameItem.id} value={gameItem.id}>
                {gameItem.title}
              </option>
            ))}
          </Form.Select>
          <Form.Label>Organizer</Form.Label>
          <Form.Select
            name="organizer"
            value={currentEvent.organizer}
            onChange={handleChange}
          >
            {gamers.map((gamerItem) => (
              <option key={gamerItem.id} value={gamerItem.id}>
                {gamerItem.bio}
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
