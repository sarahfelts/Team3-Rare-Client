import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { getGames } from '../components/api/gameData';
import { useAuth } from '../utils/context/authContext';
import { useGetEvents } from '../components/api/eventData';

function Home() {
  const [games, setGames] = useState([]);
  const { user } = useAuth;

  useEffect(() => {
    useGetEvents().then((data) => {
      console.warn(data);
      setEvents(data);
    });
    getGames().then((data) => {
      console.warn(data);
      setGames(data);
    });
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard
            id={game.id.toString()}
            title={game.title}
            maker={game.maker}
            numberOfPlayers={game.number_of_players}
            skillLevel={game.skill_level}
            onUpdate={() => window.location.reload()}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
