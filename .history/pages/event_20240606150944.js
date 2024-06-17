import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { getEvents } from '../components/api/eventData';
import { useAuth } from '../utils/context/authContext';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState(null); // Add a state for the uid
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = useAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        console.warn('Logged in user UID:', user.uid);
        setUid(user.uid);
      } else {
        // User is signed out
        console.warn('No user is signed in');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (uid) {
      getEvents(uid).then((data) => {
        setEvents(data);
      });
    }
  }, [uid]);

  return (
    <article className="events">
      <h1>Events</h1>
      <Link href="/events/new" passHref>
        <button type="button">Register New Event</button>
      </Link>
      {Array.isArray(events) && events.map((event) => {
        console.warn('Mapping event:', event); // Log the event being mapped
        return (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              id={event.id}
              game={event.game}
              description={event.description}
              date={event.date}
              time={event.time}
              organizer={event.organizer}
              onUpdate={() => window.location.reload()}
            />
          </section>
        );
      })}
    </article>
  );
}
export default EventPage;
