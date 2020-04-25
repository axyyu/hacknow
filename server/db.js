const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://admin:admin@cluster0-9a9uk.gcp.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db('users').collection('testUser');
  // perform actions on the collection object
  client.close();
});
