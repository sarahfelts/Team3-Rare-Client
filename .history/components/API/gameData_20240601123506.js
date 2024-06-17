const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;


const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}games`, {  // Adjusted URL
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
  return fetch(`${endpoint}games`, { 
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
  })
  .catch((error) => {
    console.error('Error:', error);
    throw error;  // Propagate the error so it can be caught outside
  });
};
  const getGameTypes = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}gametypes`, {  // Adjusted URL
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
// eslint-disable-next-line import/prefer-default-export
export { getGames, createGame, getGameTypes };
