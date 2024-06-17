import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EventCard from '../components/EventCard';
import { getEvents } from '../components/api/eventData';

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Link href="/events/new" passHref>
        <button type="button">Register New Event</button>
      </Link>
      {events.map((event) => {
        console.warn(`Sending event with id: ${event.id} to EventCard`);
        return (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              game={event.game}
              description={event.description}
              date={event.date}
              time={event.time}
              organizer={event.organizer}
            />
          </section>
        );
      })}
    </article>
  );
}

export default EventPage;
