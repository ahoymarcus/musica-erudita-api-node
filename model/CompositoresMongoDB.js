const db = require('./mongodb');

let ObjectId = require('mongodb').ObjectID;


class CompositoresMongoDB {

  static getCompositores(callback) {

    let compositores = db.get().collection('compositores');
    compositores.find({}).toArray(function(err, results) {
      if (err) {
        callback(err, null);
      }

      callback(null, results);
    });
  }

  static getCompositoresByTipo(tipo, callback) {

    let compositores = db.get().collection('compositores');
    compositores.find({ "tipo": tipo }).toArray(function(err, results) {
      if (err) {
        callback(err, null);
      }

      callback(null, results);
    });
  }

  static getCompositoresById(id, callback) {

    let compositores = db.get().collection('compositores');
    compositores.findOne({ "_id": Object(id) }, function(err, results) {
      if (err) {
        callback(err, null);
      }

      if (results.length == 0) {
        console.log("Nenhum compositor encontrado...");
        return;
      }
      let compositor = results[0];
      callback(null, compositor);
    });
  }

  static save(compositor, callback) {

    let compositores = db.get().collection('compositores');
    compositores.insert(compositor, function(err, results) {
      if (err) {
        callback(err, null);
      }

      compositor.id = results.insertId;
      callback(null, compositor);
    });
  }

  static update(compositor, callback) {

    let compositores = db.get().collection('compositores');
    let id = compositor._id;

    // Remove o id do JSON
    delete compositor._id;

    compositores.update({ "_id": ObjectId(id) }, compositor, function(err, results) {
      if (err) {
        callback(err, null);
      }

      callback(null, compositor);
    });
  }

  static delete(compositor, callback) {

    let compositores = db.get().collection('compositores');
    let id  = compositor._id;
    compositores.removeOne({ "_id": ObjectId(id) }, function(err, results) {
      if (err) {
        callback(err, null);
      }

      // Atenção: quando há um erro o obj compositor está sendo retornado???
      callback(null, compositor);
    });
  }

  static deleteById(id, callback) {

    let compositores = db.get().collection('compositores');
    compositores.removeOne({ "_id": ObjectId(id) }, function(err, results) {
      if (err) {
        callback(err, null);
      }

      // Atenção: quando há um erro o obj affectedRows indefinido derruba o servidor!!!
      callback(null, results.affectedRows);
    });;
  }
};

module.exports = CompositoresMongoDB;
