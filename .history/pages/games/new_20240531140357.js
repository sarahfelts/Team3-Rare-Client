import React from 'react';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import GameForm from '../../components/game/GameForm';
import {UseAuth} from '../../hooks/useAuth';

const NewGame = () => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div>
      <h2>Register New Game</h2>
      <GameForm user={user} />
      <Button onClick={() => router.push('/games/new')}>
        Register New Game
      </Button> 
    </div>
  );
};

export default NewGame;
