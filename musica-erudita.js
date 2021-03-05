const express = require('express');
const bodyParser = require('body-parser');

const CompositoresDB = require('./CompositoresDB');


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.send('API dos compositores');
});
app.get('/compositores', function(req, res) {
  CompositoresDB.getCompositores(function(compositores) {
    res.json(compositores);
  });
});
app.get('/compositores/:tipo', function(req, res) {
  let tipo = req.params.tipo;

  CompositoresDB.getCompositoresByTipo(tipo, function(compositores) {
    res.json(compositores);
  });
});

app.post('/compositores', function(req, res) {
  let compositor = req.body;

  CompositoresDB.save(compositor, function(compositor) {
    res.json(compositor);
  });
});

app.put('/compositores', function(req, res) {
  let compositor = req.body;

  CompositoresDB.update(compositor, function(compositor) {
    res.json(compositor);
  });
});



let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Servidor iniciado em http://%s:%s", host, port);
});
