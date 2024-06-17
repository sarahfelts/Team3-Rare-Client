import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getEvent } from '../../../components/api/eventData';
import EventForm from '../../../components/game/EventForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getEvent(id)
      .then((data) => {
        setEditEvent(data);
      })
      .catch((error) => {
        console.error('Error fetching event:', error);
      });
  }, [id]);

  return (
    id ? <EventForm user={user} id={id} currentEvent={editEvent} /> : 'Loading...'
  );
}
