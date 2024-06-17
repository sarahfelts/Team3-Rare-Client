// [id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getEvent } from '../../components/api/eventData';
import EventCard from '../../components/EventCard';

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
    <EventCard {...event} /> // Spread the event object into separate props
  ) : (
    <div>Loading...</div>
  );
}
