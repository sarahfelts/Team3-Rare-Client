import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [game, setGame] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getGame(id).then(setGame);
    }
  }, [id]);

  return game ? <GameForm game={game} id={id} /> : 'Loading...';
}
