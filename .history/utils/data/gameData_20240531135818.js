import clientCredentials from '../client';

const getGames = () => new Promise((resolve, reject) => {
  const url = new URL('games', process.env.NEXT_PUBLIC_DATABASE_URL).href;

  fetch(url)
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
