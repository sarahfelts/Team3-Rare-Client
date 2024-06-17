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

export default getGamers;
