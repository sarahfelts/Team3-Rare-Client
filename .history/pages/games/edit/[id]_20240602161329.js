import { useRouter } from 'next/router';

function GameList({ games }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/editGame/${id}`);
  };

  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>
          <h2>{game.title}</h2>
          <button onClick={() => handleEdit(game.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}