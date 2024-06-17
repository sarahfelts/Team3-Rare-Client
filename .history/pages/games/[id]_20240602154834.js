import { getGame } from '../../components/api/gameData';

// Call the function with the id of the game you want to fetch
getGame(1)
  .then((game) => {
    console.warn(game); // Log the game data
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });
