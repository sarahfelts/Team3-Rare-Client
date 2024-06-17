const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getGamer = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}gamer`, {
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

export default getGamer;