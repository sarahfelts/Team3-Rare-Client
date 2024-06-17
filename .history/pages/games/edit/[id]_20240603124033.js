import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getGame(id).then((data) => {
      console.warn(data);
      console.warn(user);
      setEditGame(data);
    });
  }, [id]);

  return (
    id ? <GameForm user={user} id={id} game={editGame} /> : 'Loading...'
  );
}
