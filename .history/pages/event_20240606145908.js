import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { getEvents } from '../components/api/eventData';
import { getGamer } from '../components/api/gamerData';

function EventPage() {
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState(null); // Add a state for the uid

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      getGamer(uid).then((gamer) => {
        console.warn('Gamer data:', gamer);
      }).catch((error) => {
        console.error('Error fetching gamer:', error);
      });
    }
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
