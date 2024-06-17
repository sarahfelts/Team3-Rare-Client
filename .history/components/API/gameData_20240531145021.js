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

const createGame = async (game) => {
  try {
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const getGameTypes = () => new Promise((resolve, reject) => {
  fetch("", {})
    .then()
    .catch();
});

// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
