import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getEvent } from '../../components/api/eventData';
import EventCard from '../../components/EventCard';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      getEvent(id)
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
      {console.warn(`Sending event with id: ${event.id} to EventCard`)}
      <EventCard id={event.id} event={event} />
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
