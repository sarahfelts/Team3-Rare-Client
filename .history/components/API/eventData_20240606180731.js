import { useAuth } from '../../utils/context/authContext';

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

const useGetEvents = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  return getEvents(uid);
};

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

// GET SINGLE EVENT
const getEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}events/${id}`, {
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

// UPDATE EVENT
const updateEvent = (id, payload) => new Promise((resolve, reject) => {
  console.warn('payload', payload);
  fetch(`${endpoint}events/${id}`, {
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

// DELETE EVENT
const deleteEvent = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}events/${id}`, {
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
  getEvents, createEvent, getEvent, updateEvent, deleteEvent, useGetEvents,

};
