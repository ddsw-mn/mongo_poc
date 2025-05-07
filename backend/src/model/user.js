class User {

  constructor({ first_name, last_name, username, mail }) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.mail = mail;
  }

}

module.exports = User;