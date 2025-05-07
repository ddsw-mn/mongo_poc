const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mongo_poc';

async function connect() {
  try {
    await mongoose.connect(uri);
    console.info('Connected to MongoDB (Mongoose)');
  } catch (error) {
    console.error('Database connection error (Mongoose):', error);
    throw error;
  }
}

async function close() {
  try {
    await mongoose.disconnect();
    console.info('MongoDB connection closed (Mongoose)');
  } catch (error) {
    console.error('Error closing connection (Mongoose):', error);
  }
}

module.exports = { connect, close };