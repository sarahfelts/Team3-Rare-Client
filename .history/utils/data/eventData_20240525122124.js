import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  const url = new URL('events', clientCredentials.databaseURL).href;

  fetch(url)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// eslint-disable-next-line import/prefer-default-export
export { getEvents };
