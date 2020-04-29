const express = require('express');
const gqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();

app.use('/graphql', gqlHttp({
  schema,
  graphiql: true
}));


mongoose.connect(config.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', () => {
  console.log('Cnnected to database !!');
})

app.listen(3000, (err, con) => {
  if (!err) console.log('Server is listening on 3000');
  else console.log('Error: ' + err);
})