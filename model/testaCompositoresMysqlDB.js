const CompositoresDB = require('./CompositoresDB');


// testando a conexão com o DB
//CompositoresDB.connect();

// // GETCOMPOSITORES
// CompositoresDB.getCompositores(function(compositores) {
//   compositores.map(compositor => {
//     console.log(compositor.id + ": " + compositor.apelido + " :: " + compositor.estilo);
//   });
// });

// GETCOMPOSITORESBYTIPO
const tipo = 'erudito';
CompositoresDB.getCompositoresByTipo(tipo, function(compositores) {
  compositores.map(compositor => {
    console.log(compositor.id + ": " + compositor.apelido + " :: " + compositor.estilo);
  });
});

// // GETCOMPOSITORESBYID
// CompositoresDB.getCompositoresById(5, function(compositor) {
//   console.log(compositor.id + ": " + compositor.apelido + " :: " + compositor.estilo);
// });

// // INSERT
// const compositorTeste1 = { apelido: 'teste', tipo: 'teste' };
// CompositoresDB.save(compositorTeste1, function(compositor) {
//   console.log("Compositor salvo: " + compositor.id + ": " + compositor.apelido);
// });

// // UPDATE
// const compositorTeste2 = { id: 13, apelido: 'TESTE', tipo: 'teste' };
// CompositoresDB.update(compositorTeste2, function(compositor) {
//   console.log("Compositor atualizado: " + compositor.id + ": " + compositor.apelido);
// });

// // DELETE
// const compositor = { id: 13 };
// CompositoresDB.delete(compositor, function(compositor) {
//   console.log("Compositor deletado: " + compositor.id);
// });

// // DELETEBYID
// const id = 21;
// CompositoresDB.deleteById(id, function(compositor) {
//   console.log("Record deleted...");
// });
