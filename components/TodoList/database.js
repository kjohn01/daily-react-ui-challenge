const API_URL = "/api/TodoList";
const FETCH_URL = `${API_URL}/fetchAllTodoItems`;
const UPDATE_URL = `${API_URL}/updateTodoItems`;
const DB = "TodoList";

export const fetchTodoItems = async () => {
  const localCache = caches.open(DB);
  const handleError = () => {
      console.error('Fetch failed; returning offline todo items instead.');
      return localCache.then((cache) => cache.match(FETCH_URL)
      .then((res) => res.json()))
      .catch((err) => {
        console.error('no cached todo item found!', err);
        return [];
      });
  };
  return await fetch(FETCH_URL).then(response => {
      if (!response.ok) return handleError();
      localCache.then((cache) => cache.put(FETCH_URL, response));
      return response.clone().json();
    })
    .catch((error) => {
      console.error(error);
      return handleError();
    });
};

export const updateTodoItems = async (items = []) => {
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(items)
  };
  return await fetch(UPDATE_URL, options).then(response => {
    caches.open(DB).then((cache) => {
      if (!response.ok) throw new TypeError('Bad response status');
      return cache.put(FETCH_URL, response);
    });
    return response.clone().json();
  }).catch((err) => {
      console.error('Error on writing to the database', err);
      return items;
  });
};
