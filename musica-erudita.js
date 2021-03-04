const http = require('http');
const url = require('url');

const CompositoresDB = require('./CompositoresDB');


function getCompositores(response, tipo) {
  CompositoresDB.getCompositoresByTipo(tipo, function(compositores) {
    let json = JSON.stringify(compositores);

    response.end(json);
  });
};


function callbackServer(request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

  const parts = url.parse(request.url);

  if (parts.path === '/') {
    response.end("http://localhost:3000/compositores/erudito - http://localhost:3000/compositores/popular");
  } else if (parts.path === '/compositores/erudito') {
    getCompositores(response, "erudito");
  } else if (parts.path === '/compositores/popular') {
    getCompositores(response, "popular");
  } else {
    response.end("Not found: " + parts.path);
  }
};

const server = http.createServer(callbackServer);

const port = 3000;
server.listen(port);

console.log("Servidor iniciado em http://localhost:" + port);
