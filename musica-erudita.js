const express = require('express');
const bodyParser = require('body-parser');



let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
  ROTAS da API Compositores
*/
app.use('/api/compositores', require('./routes/compositores'));


// teste de erros
app.get('/teste-erro', function(req, res) {
  throw Error('Erro Ninja');
});

// code 404
app.use(function(req, res, next) {
  res.status(404);
  res.send({ notfound: 'URL não encontrada...'});
});

// code 500
app.use(function(err, req, res, next) {
  console.error(err);

  res.status(500);
  /*
    Atenção: em Produção é necessário substituir a mensagem de erro do sistema por uma mensagem Genérica!!!
  */
  res.json({ erro: "Erro na transação." });
});


let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Servidor iniciado em http://%s:%s", host, port);
});
