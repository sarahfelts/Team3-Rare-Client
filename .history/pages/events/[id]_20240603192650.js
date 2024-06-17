import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getGame } from '../../components/api/gameData';
import EventCard from '../../components/EventCard';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (id) {
      getGame(id)
        .then((gameData) => {
          setGame(gameData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  return game ? (
    <Card className="text-center">
      <EventCard game={game} />
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
