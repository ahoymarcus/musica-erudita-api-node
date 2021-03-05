const express = require('express');
const bodyParser = require('body-parser');



let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
  ROTAS da API Compositores
*/
app.use('/api/compositores', require('./routes/compositores'));


let server = app.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Servidor iniciado em http://%s:%s", host, port);
});
