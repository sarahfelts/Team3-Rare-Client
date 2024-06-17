import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent, getEvent } from '../api/eventData';

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
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (id) {
      getEvent(id)
        .then((event) => {
          console.warn('Event', event);
          setCurrentEvent(event);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setCurrentEvent(initialState);
    }
  }, [id, user.uid]);

  useEffect(() => {
    console.warn('Current Event', currentEvent);
  }, [currentEvent]);

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
      game_id: currentEvent.game_id,
      organizer_id: currentEvent.organizer_id,
      userId: user.uid,
    };

    if (id) {
      updateEvent(id, event)
        .then(() => {
          router.push(`/events/${id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      createEvent(e)
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
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentEvent.description} onChange={handleChange} />
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" required value={currentEvent.date} onChange={handleChange} />
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" required value={currentEvent.time} onChange={handleChange} />
          <Form.Label>Event</Form.Label>
          <Form.Select
            name="gameType"
            value={currentEvent.gameType}
            onChange={handleChange}
          >
            {event.map((eventItem) => (
              <option key={eventItem.id} value={eventItem.id}>
                {eventItem.title}
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