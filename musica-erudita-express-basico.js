const express = require('express');
const bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Necessário usar esse middleware para o parsing de JSON
app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.status(500).json({ msg: 'Ooops, deu ruim!!!!!!! :('});
});

/* usando QUERY PARAMETERS */
app.get('/compositor', function(req, res) {
  let apelido = req.query.apelido;
  let tipo = req.query.tipo;

  res.status(200).type("text");
  res.send(apelido + " :: " + tipo)
});
/* usando PAHT PARAMETERS */
app.get('/compositor/:id', function(req, res) {
    let id = req.params.id;

    res.send("Buscar compositor com o id: " + id);
});
app.get('/compositor/apelido/:apelido/tipo/:tipo', function(req, res) {
  let apelido = req.params.apelido;
  let tipo = req.params.tipo;

  res.send(apelido + " :: " + tipo);
});

app.post('/compositor', function(req, res) {
  let apelido = req.body.apelido;
  let tipo = req.body.tipo;

  if (req.is("json")) {
    res.json({ apelido: apelido, tipo: tipo });
  } else {
    res.type("text/plain").send("Apelido: " + apelido + " :: " + "Tipo: " + tipo);
  }
});


let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Servidor iniciado em http://%s:%s", host, port);
});
