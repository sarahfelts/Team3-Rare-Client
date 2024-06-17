import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import AddGameForm from '../../../components/game/GameForm';

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
    id ? <AddGameForm firebaseKey={id} editGame={editGame} /> : 'Loading...'
  );
}
