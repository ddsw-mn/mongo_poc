const { connect } = require('../clients/mongo.client');

class UserRepository {

  #COLLECTION_NAME = 'users';

  async users() {
    const db = await connect();
    return db.collection(this.#COLLECTION_NAME);
  }

  async create(user) {
    const usersCollection = await this.users();
    return await usersCollection.insertOne(user);
  }

  async list() {
    const usersCollection = await this.users();
    return await usersCollection.find({}).toArray();
  }

  async retrieve(username) {
    const usersCollection = await this.users();
    return await usersCollection.findOne({ username: username });
  }

  async update({ username, ...updateData }) {
    const usersCollection = await this.users();
    return await usersCollection.updateOne(
      { username: username },
      { $set: updateData }
    );
  }

  async delete(username) {
    const usersCollection = await this.users();
    return await usersCollection.deleteOne({ username: username });
  }
}

module.exports = new UserRepository();