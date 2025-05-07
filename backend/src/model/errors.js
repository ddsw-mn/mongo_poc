class ClientError extends Error {
  constructor(message, status = 400, name = 'ClientError') {
    super(message);
    this.status = status;
    this.name = name;
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404, 'NotFoundError');
  }
}

module.exports = {
  ClientError,
  NotFoundError,
};