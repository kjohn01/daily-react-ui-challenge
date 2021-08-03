
const { MongoClient } = require('mongodb');
const URI = process.env.MONGODB_URI;
const DB = "TodoList";

if (!URI) throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
);

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) cached = global.mongo = { conn: null, promise: null };
 
export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
 
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }; 
 
        cached.promise = MongoClient.connect(URI, opts).then((client) => {
            return {
                client,
                db: client.db(DB),
            }
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};