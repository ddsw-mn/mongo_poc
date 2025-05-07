class User {
  constructor({ firstName, lastName, username, mail }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.mail = mail;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = User;
