const MongoClient = require('mongodb').MongoClient;


const mongoServer = 'mongodb://localhost:27017';

MongoClient.connect(mongoServer, function(err, client) {
  if (err) return callback(err);

  let db = client.db('compositores');

  let compositores = db.collection('compositores');

  compositores.find({}).toArray(function(err, results) {
    for (let compositor of results) {
      console.log(compositor);
    }
  });
});
