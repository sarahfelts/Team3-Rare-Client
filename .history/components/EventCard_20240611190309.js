import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { joinEvent, leaveEvent } from './api/eventData';

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  organizer,
  onUpdate,
  joined,
}) => {
  const datetime = new Date(`${date}T${time}`);

  const handleJoin = () => {
    joinEvent(id).then(() => {
      onUpdate();
    });
  };

  const handleLeave = () => {
    leaveEvent(id).then(() => {
      onUpdate();
    });
  };

  const deleteThisGame = () => {
    if (window.confirm(`Delete ${description}?`)) {
      deleteEvent(id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>Description: {description}</Card.Title>
        <Card.Text>Date and Time: {datetime.toString()}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
      <Link href={`/events/edit/${id}`} passHref>
        <Button>Edit Events</Button>
      </Link>
      <Link href={`/events/${id}`} passHref>
        <Button>View Event</Button>
      </Link>
      <Button onClick={handleLeave}>Leave Event</Button>
      ) : (
        <Button onClick={handleJoin}>Join Event</Button>
    </Card>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
