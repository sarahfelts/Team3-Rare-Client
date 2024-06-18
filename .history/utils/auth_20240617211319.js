import firebase from 'firebase/app';
import 'firebase/auth';

const checkUser = (uid) => new Promise((resolve, reject) => {
  const url = new URL('checkuser', process.env.NEXT_PUBLIC_DATABASE_URL).href;

  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      uid,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});
const registerUser = async (userInfo) => {
  console.warn('userInfo', userInfo);
  const url = new URL('users/register_user', process.env.NEXT_PUBLIC_DATABASE_URL).href;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Failed to register user: ${message}`);
  }

  return response.json();
};

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};
