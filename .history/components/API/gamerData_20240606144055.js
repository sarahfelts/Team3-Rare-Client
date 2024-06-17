const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getGamers = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}gamers`, {
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

// GET SINGLE GAMER
const getGamer = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}gamers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        console.warn(`getEvent data: ${JSON.stringify(data)}`);
        resolve(data);
      } else {
        resolve(null);
      }
    })
    .catch(reject);
});

export { getGamers, getGamer };
