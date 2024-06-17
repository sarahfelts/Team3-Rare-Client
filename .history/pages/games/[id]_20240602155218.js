import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getGame } from '../../components/api/gameData';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);

  useEffect(() => {
    console.log('id', id); // Check if the id is defined
    if (id) {
      console.log('Calling getGame with id:', id); // Check if the getGame function is being called
      getGame(id)
        .then((gameData) => {
          console.log(gameData); // Check if the getGame function is returning the expected data
          setGame(gameData);
        })
        .catch((error) => {
          console.error(error); // Check if there are any errors
        });
    }
  }, [id]);
  return game ? (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {game.maker}</Card.Title>
        <Card.Text>{game.numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {game.skillLevel}</Card.Footer>
      <Link href={`/games/edit/${id}`} passHref>
        <Button>Edit Game</Button>
      </Link>
      <Link href={`/games/${id}`} passHref>
        <Button>View Game</Button>
      </Link>
    </Card>
  ) : (
    <div>Loading...</div>
  );
}