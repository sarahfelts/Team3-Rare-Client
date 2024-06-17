import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getGame } from '../../components/api/gameData';
import EventCard from '../../components/EventCard';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      getGame(id)
        .then((gameData) => {
          setEvent(gameData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  return event ? (
    <Card className="text-center">
      <EventCard event={event} />
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
