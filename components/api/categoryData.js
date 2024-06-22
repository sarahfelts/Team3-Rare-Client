const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

// Function to get all categories
const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
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

// Function to get a single category
const getSingleCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
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

// Function to create a new category
const createCategory = (label) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ label }),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

// Function to update a category
const updateCategory = (id, label) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ label }),
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

// Function to delete a category
const deleteCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
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

export {
  getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory,
};
