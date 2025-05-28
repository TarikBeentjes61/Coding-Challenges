const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

let db;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('CodingChallenges'); 
    console.log('Connected to MongoDB');
  }
  return db;
}

function getDB() {
  if (!db) throw new Error('DB not initialized. Call connectToDB first.');
  return db;
}

module.exports = { connectToDB, getDB };
