import { getGame } from '../api/gameData'; // Adjust the path according to your project structure

// Call the function with the id of the game you want to fetch
getGame(1)
  .then((game) => {
    console.log(game); // Log the game data
  })
  .catch((error) => {
    console.error(error); // Log any errors
  });