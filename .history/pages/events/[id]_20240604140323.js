import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getEvent } from '../../components/api/eventData';
import EventForm from '../../components/game/EventForm';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      getEvent(id)
        .then((eventData) => {
          setEvent(eventData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  return event ? (
    <Card className="text-center">
      <Card.Header>{event.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {event.maker}</Card.Title>
        <Card.Text>{event.number_of_players} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {event.skill_level}</Card.Footer>
      <Link href={`/games/edit/${id}`} passHref>
        <Button>Edit Event</Button>
      </Link>
      <Link href={`/games/${id}`} passHref>
        <Button>View Event</Button>
      </Link>
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
