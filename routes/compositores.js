const express = require('express');

const CompositoresDB = require('./../model/CompositoresDB');



const router = express.Router();

router.get('/', function(req, res) {
  res.send('API dos compositores');
});
router.get('/compositores', function(req, res) {
  CompositoresDB.getCompositores(function(compositores) {
    res.json(compositores);
  });
});

/*
  Atenção: a rota /compositores/:id deve preceder a /compositores/:tipo
  A expressão regular (\\d+) é responsável por aceitar apenas números para responsta na rota
*/
router.get('/compositores/:id(\\d+)', function(req, res) {
  let id = req.params.id;

  CompositoresDB.getCompositoresById(id, function(compositor) {
    res.json(compositor);
  });
});
router.delete('/compositores/:id(\\d+)', function(req, res) {
  let id = req.params.id;

  console.log("Deletar compositor id: " + id);
  CompositoresDB.deleteById(id, function(affectedrows) {
    res.json({ msg: 'Compositor deletado com sucesso...' });
  });
});
router.get('/compositores/:tipo', function(req, res) {
  let tipo = req.params.tipo;

  CompositoresDB.getCompositoresByTipo(tipo, function(compositores) {
    res.json(compositores);
  });
});

router.post('/compositores', function(req, res) {
  let compositor = req.body;

  CompositoresDB.save(compositor, function(compositor) {
    res.json(compositor);
  });
});

router.put('/compositores', function(req, res) {
  let compositor = req.body;

  CompositoresDB.update(compositor, function(compositor) {
    res.json(compositor);
  });
});


module.exports = router;
