const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}events`, {
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error:', error);
      reject(error);
    });
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
        resolve(data);
      } else {
        resolve(null);
      }
    })
    .catch(reject);
});

// UPDATE EVENT
const updateEvent = (id, payload) => new Promise((resolve, reject) => {
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
const leaveEvent = (id) => new Promise((resolve, reject) => {
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

const joinEvent = (id, uid) => fetch(`${endpoint}events/${id}`, {
  method: 'POST',
  headers: {
    Authorization: uid,
  },
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
// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, createEvent, getEvent, updateEvent, leaveEvent, joinEvent,

};
