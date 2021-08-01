import { MongoClient } from 'mongodb'

const URI = process.env.MONGODB_URI
const DB = process.env.MONGODB_DB

if (!URI) {
  throw new Error(
    'Please define the URI environment variable inside .env.local'
  )
}

if (!DB) {
  throw new Error(
    'Please define the DB environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(URI, opts).then((client) => {
      return {
        client,
        db: client.db(DB),
      }
    })
  }
  cached.conn = await cached.promise
  console.log(cached.conn);
  return cached.conn
}

// const arrEquals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

export const fetchTodoItems = async () => {
  return await fetch(URI).then((res) => {
    caches.open(DB).then((cache) => {
      if (!res.ok) {
        throw new TypeError('Bad response status');
      }
      return cache.put(URI, res);
    })
    console.log(res.body);
    return res.body;
  }).catch((err) => {
    console.error('Fetch failed; returning offline page instead.', err);
    return caches.open(DB).then((cache) => cache.match(URI).body);
  });
};
