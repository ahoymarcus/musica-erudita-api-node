const express = require('express');
const bodyParser = require('body-parser');

const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers');
const db = require('./model/mongodb');



let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.get('/', handlers.home);

app.get('/about', handlers.about);

app.get('/api/mysql', handlers.compositoresMysql);

app.get('/api/mongodb/', handlers.compositoresMongodb);


/*
  ROTAS para as APIs Compositores
*/
app.use('/api/mysql/compositores', require('./routes/compositoresMysql'));

app.use('/api/mongodb/compositores', require('./routes/compositoresMongodb'));



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


/*
  Para inicializar sem o Mongodb
*/
// let server = app.listen(3000, function() {
//   let host = server.address().address;
//   let port = server.address().port;
//   console.log("Servidor iniciado em http://%s:%s", host, port);
// });

/*
  PARA INICIALIZAR SÓ APÓS CONEXÃO COM O MONGODB
*/
db.connect(function(err) {
  if (err) {
    console.log('Erro ao conectar com o MongoDB');
    process.exit(1);
  } else {
    console.log("MongoDB conectado: ", db);

    // Iniciando o servidor do Nodejs
    let server = app.listen(3000, function() {
      let host = server.address().address;
      let port = server.address().port;
      console.log("Servidor inciado em http://%s:%s", host, port);
    });
  }
});
