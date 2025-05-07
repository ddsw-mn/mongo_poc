const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mongo_poc';

function connect() {
  return mongoose.connect(uri)
    .then(() => console.info('Connected to MongoDB (Mongoose)'))
    .catch(error => {
      console.error('Database connection error (Mongoose):', error);
      throw error;
    });
}

function close() {
  return mongoose.disconnect()
    .then(() => console.info('MongoDB connection closed (Mongoose)'))
    .catch(error => console.error('Error closing connection (Mongoose):', error));
}

module.exports = { connect, close };
