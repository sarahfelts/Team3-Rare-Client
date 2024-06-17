import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../../components/api/gameData';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const [loading, setLoading] = useState(true); // add a loading state
  const router = useRouter();
  const { currentUser } = useAuth();

  const { id } = router.query;

  useEffect(() => {
    getGame(id).then((data) => {
      setEditGame(data);
      setLoading(false); // set loading to false when getGame returns
    });
  }, [id]);

  return (
    loading ? 'Loading...' : <GameForm user={currentUser} id={id} game={editGame} />
  );
}
