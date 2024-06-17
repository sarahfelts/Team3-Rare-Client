import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { getGame } from '../../components/api/gameData';

export default function Game() {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (id) {
      getGame(id)
        .then((gameData) => {
          setGame(gameData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  return game ? (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {game.maker}</Card.Title>
        <Card.Text>{game.number_of_players} players needed</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {game.skill_level}</Card.Footer>
      <Link href={`/event/edit/${id}`} passHref>
        <Button>Edit Game</Button>
      </Link>
      <Link href={`/event/${id}`} passHref>
        <Button>View Game</Button>
      </Link>
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
