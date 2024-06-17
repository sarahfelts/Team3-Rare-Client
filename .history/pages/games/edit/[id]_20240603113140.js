import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getGame(id).then((data) => {
      setEditGame(data);
    });
  }, [id]);

  return (
    id ? <GameForm id={id} game={editGame} /> : 'Loading...'
  );
}
