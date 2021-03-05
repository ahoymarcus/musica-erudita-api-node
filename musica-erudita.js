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

/*
  Atenção: a rota /compositores/:id deve preceder a /compositores/:tipo
  A expressão regular (\\d+) é responsável por aceitar apenas números para responsta na rota
*/
app.get('/compositores/:id(\\d+)', function(req, res) {
  let id = req.params.id;

  CompositoresDB.getCompositoresById(id, function(compositor) {
    res.json(compositor);
  });
});
app.delete('/compositores/:id(\\d+)', function(req, res) {
  let id = req.params.id;

  console.log("Deletar compositor id: " + id);
  CompositoresDB.deleteById(id, function(affectedrows) {
    res.json({ msg: 'Compositor deletado com sucesso...' });
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
