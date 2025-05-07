const { connect } = require('../clients/mongo.client');

class UserRepository {

  COLLECTION_NAME = 'users';

  collection() {
    return connect().then(db => db.collection(this.COLLECTION_NAME));
  }

  create(user) {
    return this.collection().then(collection => collection.insertOne(user));
  }

  list() {
    return this.collection().then(collection => collection.find({}).toArray());
  }

  retrieve(username) {
    return this.collection().then(collection => collection.findOne({ username }));
  }

  update({ username, ...updateData }) {
    return this.collection().then(collection =>
      collection.updateOne({ username }, { $set: updateData })
    );
  }

  delete(username) {
    return this.collection().then(collection => collection.deleteOne({ username }));
  }
}

module.exports = UserRepository;
