import { clientCredentials } from '../client';

const getPosts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// This function will send a POST request to your server to create a new post with the details provided by the user.
const createPost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${post}`,
    },
    body: JSON.stringify(post),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// // This function will fetch all game types from your server, which will be used to populate a dropdown menu in your form.
// const getGameTypes = () => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/gametypes`)
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

const updatePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${id}`,
    },
    body: JSON.stringify(),
  })
    .then(resolve)
    .catch(reject);
});

// had id before
const getSinglePost = (post) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${post}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/posts/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      resolve();
    })
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getPosts,
  createPost,
  updatePost,
  getSinglePost,
  deletePost,
};
