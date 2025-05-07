const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/mongo_poc';

let client;
let db;

async function connect() {
  if (!client) {
    client = new MongoClient(uri);
    try {
      await client.connect();
      console.info('Conectado a MongoDB desde database.js');
      db = client.db('mongo_poc');
    } catch (error) {
      console.error('Error al conectar a MongoDB desde database.js:', error);
      throw error;
    }
  }
  return db;
}

async function close() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.info('Conexión a MongoDB cerrada desde database.js');
  }
}

module.exports = { connect, close };