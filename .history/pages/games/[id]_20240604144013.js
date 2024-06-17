import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import GameCard from '../../components/GameCard';
import { getGame } from '../../components/api/gameData';

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
  if (game) {
    console.warn(game);
  }
  return game ? (
    <GameCard {...game} /> // Spread the event object into separate props
  ) : (
    <div>Loading...</div>
  );
}
