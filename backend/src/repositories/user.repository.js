class UserRepository {
  constructor() {
    this.users = [];
  }

  create(user) {
    this.users.push(user);
  }

  list() {
    return this.users;
  }

  retrieve(username) {
    return this.users.find(user => user.username === username);
  }

  update(toUpdate) {
    const index = this.users.findIndex(user => user.username === toUpdate.username);

    if (index !== -1) {
      this.users[index] = toUpdate;
      return this.users[index];
    }
    return null;
  }

  delete(username) {
    const index = this.users.findIndex(user => user.username === username);

    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new UserRepository();