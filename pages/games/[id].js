import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import GameCard from '../../components/GameCard';
import { getGame, updateGame } from '../../components/api/gameData';

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
    <GameCard
      title={game.title}
      maker={game.maker}
      numberOfPlayers={game.number_of_players}
      skillLevel={game.skill_level}
      id={game.id}
      onUpdate={updateGame} // Replace updateGames with your actual update function
    />
  ) : (
    <div>Loading...</div>
  );
}
