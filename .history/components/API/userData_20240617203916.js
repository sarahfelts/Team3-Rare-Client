const endpoint = process.env.NEXT_PUBLIC_DATABASE_URL;

const registerUser = (uid) => new Promise((resolve, reject) => {
    fetch(`${endpoint}events`, {
      headers: {
        Authorization: uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("Oops, we haven't got JSON!");
        }
        return response.json();
      })
      .then(resolve)
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  });