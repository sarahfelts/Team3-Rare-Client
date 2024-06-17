const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;
// GET ALL GAMES
const getGames = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}games`, {
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
// GET SINGLE GAMES
const getGame = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}games/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve(null);
      }
    })
    .catch(reject);
});

// CREATE GAME
const createGame = (game) => fetch(`${endpoint}games`, {
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
    throw error;
  });

// GET GAME TYPES
const getGameTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}gametypes`, {
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

// UPDATE GAME
const updateGame = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}games/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text().then((text) => (text ? JSON.parse(text) : {}));
    })
    .then(resolve)
    .catch(reject);
});

// DELETE GAME
const deleteGame = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}games/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text().then((text) => (text ? JSON.parse(text) : {}));
    })
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});
// eslint-disable-next-line import/prefer-default-export
export {
  getGames, createGame, getGameTypes, updateGame, getGame, deleteGame,

};
