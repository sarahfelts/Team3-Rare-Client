const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}games.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      resolve(Object.values(data));
    } else {
      resolve([]);
    }
  })
  .catch(reject);
});
const createGame = (game) => {
  fetch(`${endpoint}games.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      resolve(Object.values(data));
    } else {
      resolve([]);
    }
  })
  .catch(reject);
});

const getGameTypes = () => new Promise((resolve, reject) => {
  const url = new URL('gametypes', process.env.NEXT_PUBLIC_DATABASE_URL).href;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});
// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
