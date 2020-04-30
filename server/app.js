const express = require('express');
const gqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/graphql', gqlHttp({
  schema,
  graphiql: true
}));

const mongodbURL = 'mongodb+srv://rahulraj:1308@cluster0-kqmxd.mongodb.net/data?retryWrites=true&w=majority'

mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

mongoose.connection.once('open', () => {
  console.log('Cnnected to database !!');
})

const PORT = 5000;
app.listen(PORT, (err, con) => {
  if (!err) console.log(`Server is listening on ${PORT}`);
  else console.log('Error: ' + err);
})