const { connect } = require('./clients/mongo.client.js');
const app = require('./app.js');

app.listen(3000, () => {
  connect().then(() => console.info('Server is running on port 3000'));
});
