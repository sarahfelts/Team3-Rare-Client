const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const getUsers = () => new Promise((resolve, reject) => {
    fetch(`${endpoint}users`, {
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

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}users/${id}`, {
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

const deleteUser = (id) => new Promise((resolve, reject) => {
    fetch(`${endpoint}users/${id}`, {
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

  const updateUser = (id, payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}users/${id}`, {
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
  
  const updateActivityStatus = (id, payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}users/${id}/update_active`, {
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
export { getUsers, getSingleUser, deleteUser, updateUser, updateActivityStatus };
