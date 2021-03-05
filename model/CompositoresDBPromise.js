const mysql = require('mysql');


class CompositoresDB {
  static connect() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'node_essential',
      password: 'password',
      database: 'node_essential'
    });

    connection.connect();
    return connection;
  }

  static getCompositores() {
    return new Promise(function(resolve, reject) {
      let connection = CompositoresDB.connect();

      let sql = 'SELECT id, apelido, ano_nasc, loc_nasc, tipo, estilo FROM compositores';
      connection.query(sql, function(err, results, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });

      connection.end();
    });
  }

  static getCompositoresByTipo(tipo, callback) {
    let connection = CompositoresDB.connect();

    let sql = "SELECT id, apelido, ano_nasc, ano_falec, loc_nasc, tipo, estilo FROM compositores WHERE tipo = '" + tipo + "'";
    let query = connection.query(sql, function(err, results, fields) {
      if (err) {
        callback(err, null);
      }

      callback(null, results);
    });
    console.log(query.sql);

    connection.end();
  }

  static getCompositoresById(id, callback) {
    let connection = CompositoresDB.connect();

    let sql = "SELECT id, apelido, ano_nasc, ano_falec, loc_nasc, tipo, estilo FROM compositores WHERE id = ?";
    let query = connection.query(sql, id, function(err, results, fields) {
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
    console.log(query.sql);

    connection.end();
  }

  static save(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "INSERT INTO compositores SET ?";
    let query = connection.query(sql, compositor, function(err, results, fields) {
      if (err) {
        callback(err, null);
      }

      compositor.id = results.insertId;
      callback(null, compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static update(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "UPDATE compositores set ? WHERE id = ?";
    let id = compositor.id;
    let query = connection.query(sql, [compositor, id], function(err, results, fields) {
      if (err) {
        callback(err, null);
      }

      callback(null, compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static delete(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "DELETE FROM compositores WHERE id = ?";
    let id  = compositor.id;
    let query = connection.query(sql, id, function(err, results, fields) {
      if (err) {
        callback(err, null);
      }

      // Atenção: quando há um erro o obj compositor está sendo retornado???
      callback(null, compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static deleteById(id, callback) {
    let connection = CompositoresDB.connect();

    let sql = "DELETE FROM compositores WHERE id = ?";
    let query = connection.query(sql, id, function(err, results, fields) {
      if (err) {
        callback(err, null);
      }

      // Atenção: quando há um erro o obj affectedRows indefinido derruba o servidor!!!
      callback(null, results.affectedRows);
    });
    console.log(query.sql);

    connection.end();
  }
};

module.exports = CompositoresDB;
