import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { currentUser } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getGame(id).then((data) => {
      console.log(data);
      setEditGame(data);
    });
  }, [id]);

  return (
    id ? <GameForm user={currentUser} id={id} game={editGame} /> : 'Loading...'
  );
}
