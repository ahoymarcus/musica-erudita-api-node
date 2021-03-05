const express = require('express');

const CompositoresDB = require('./../model/CompositoresDB');



const router = express.Router();

router.get('/', function(req, res, next) {
  CompositoresDB.getCompositores(function(err, compositores) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json(compositores);
  });
});

/*
  Atenção: a rota /compositores/:id deve preceder a /compositores/:tipo
  A expressão regular (\\d+) é responsável por aceitar apenas números para responsta na rota
*/
router.get('/:id(\\d+)', function(req, res, next) {
  let id = req.params.id;

  CompositoresDB.getCompositoresById(id, function(err, compositor) {
    if (err) {
        console.log("Erro de SQL: " + err.message);
        return next(err);
    }

    res.json(compositor);
  });
});
router.delete('/:id(\\d+)', function(req, res, next) {
  let id = req.params.id;

  console.log("Deletar compositor id: " + id);
  CompositoresDB.deleteById(id, function(err, affectedrows) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json({ msg: 'Compositor deletado com sucesso...' });
  });
});
router.get('/:tipo', function(req, res, next) {
  let tipo = req.params.tipo;

  CompositoresDB.getCompositoresByTipo(tipo, function(err, compositores) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json(compositores);
  });
});

router.post('/', function(req, res, next) {
  let compositor = req.body;

  CompositoresDB.save(compositor, function(err, compositor) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json(compositor);
  });
});

router.put('/', function(req, res, next) {
  let compositor = req.body;

  CompositoresDB.update(compositor, function(err, compositor) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json(compositor);
  });
});

router.delete('/', function(req, res, next) {
  let compositor = req.body;

  CompositoresDB.delete(compositor, function(err, compositor) {
    if (err) {
      console.log("Erro de SQL: " + err.message);
      return next(err);
    }

    res.json({ msg: 'Compositor deletado com sucesso...' })
  });
});


module.exports = router;
