require('dotenv').config({ path: '../../.env' });
let mongoose = require('mongoose');

const databaseUri = process.env.DB_URL
console.log(databaseUri);
mongoose.connect(databaseUri, { useNewUrlParser: true, useUnifiedTopology: true }, function(
  err,
  database
) {
  if (err) {
    console.log('error connecting to to db', err);
  } else {
    console.log('connected to db');
  }
});

module.exports = mongoose;
