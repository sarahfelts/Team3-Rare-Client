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
    <EventCard event={event} /> // Use EventCard
  ) : (
    <div>Loading...</div>
  );
}
