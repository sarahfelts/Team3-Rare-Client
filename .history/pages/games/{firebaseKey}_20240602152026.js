import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../components/api/gameData';
import AddGameForm from '../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getGame(firebaseKey).then((data) => {
      setEditGame(data);
    });
  }, [firebaseKey]);

  return (
    firebaseKey ? <AddGameForm firebaseKey={firebaseKey} editGame={editGame} /> : 'Loading...'
);
}
