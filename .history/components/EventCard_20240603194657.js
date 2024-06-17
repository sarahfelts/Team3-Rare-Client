import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
  id,
}) => {
  const datetime = new Date(`${date}T${time}`);

  console.warn(`Rendering EventCard with id: ${id}`);

  return (
    <Card className="text-center">
      <Card.Header>ID:{id}</Card.Header>
      <Card.Header>{game}</Card.Header>
      <Card.Body>
        <Card.Title>Description: {description}</Card.Title>
        <Card.Text>Date and Time: {datetime.toString()}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Organizer: {organizer}</Card.Footer>
      <Link href={`/events/${id}`} passHref>
        <Button>Edit Game</Button>
      </Link>
    </Card>
  );
};

EventCard.propTypes = {
  game: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default EventCard;
