import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../components/api/gameData';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getGame(id)
        .then((game) => {
          console.warn(game); // Log the game data
        })
        .catch((error) => {
          console.error(error); // Log any errors
        });
    }
  }, [id]);

  return <div>Game {id}</div>;
}