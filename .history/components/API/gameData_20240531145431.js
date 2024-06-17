const getGames = () => new Promise((resolve, reject) => {
  const url = new URL('games', process.env.NEXT_PUBLIC_DATABASE_URL).href;

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

const createGame = (game) => {
  const url = new URL('games', process.env.NEXT_PUBLIC_DATABASE_URL).href;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(game),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });
};

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
