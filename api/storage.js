
import { MongoClient } from 'mongodb';

// Hardcoded URI as requested by the user for this specific sole-user instance.
// In a multi-user production app, this would be in process.env.
const MONGODB_URI = "mongodb+srv://Vercel-Admin-atlas-red-ball:pP96xyGSEjBsOvpM@atlas-red-ball.jhbliw1.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = "deutschflow_db";
const COLLECTION_NAME = "user_progress";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(COLLECTION_NAME);

    // Sole user ID - simplified for this use case
    const USER_ID = "sole_user_1"; 

    if (req.method === 'GET') {
      const { key } = req.query;
      
      if (!key) {
        return res.status(400).json({ error: 'Key is required' });
      }

      // We store each key as a separate document or fields in one document.
      // Let's store as separate documents: { _id: "key_name", value: ... }
      const doc = await collection.findOne({ _id: key });
      
      return res.status(200).json({ value: doc ? doc.value : null });
    } 
    
    if (req.method === 'POST') {
      const { key, value } = req.body;

      if (!key) {
        return res.status(400).json({ error: 'Key is required' });
      }

      await collection.updateOne(
        { _id: key },
        { $set: { value, updatedAt: new Date() } },
        { upsert: true }
      );

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('MongoDB Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
