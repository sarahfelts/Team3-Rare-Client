const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getEvents = () => fetch(`${endpoint}events`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
    throw error;
  });

const createEvent = (e) => fetch(`${endpoint}events`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(e),
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

// GET SINGLE GAMES
const getEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}event/${id}`, {
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
// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent, getEvent };
