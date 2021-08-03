const API_URL = "/api/TodoList";
const DB = "TodoList";

export const fetchTodoItems = async () => {
  const URL = `${API_URL}/fetchAllTodoItems`;
  return await fetch(URL).then(response => {
    caches.open(DB).then((cache) => {
      if (!response.ok) throw new TypeError('Bad response status');
      return cache.put(URL, response);
    });
    return response.clone().json();
  }).catch((err) => {
      console.error('Fetch failed; returning offline page instead.', err);
      return caches.open(DB).then((cache) => cache.match(URL).json());
  });
};
