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

  static getCompositores(callback) {
    let connection = CompositoresDB.connect();

    let sql = 'SELECT id, apelido, ano_nasc, ano_falec, loc_nasc, tipo, estilo FROM compositores';
    let query = connection.query(sql, function(err, results, fields) {
      if (err) throw error;

      callback(results);
    });
    console.log(query.sql);

    connection.end();
  }

  static getCompositoresByTipo(tipo, callback) {
    let connection = CompositoresDB.connect();

    let sql = "SELECT id, apelido, ano_nasc, ano_falec, loc_nasc, tipo, estilo FROM compositores WHERE tipo = '" + tipo + "'";
    let query = connection.query(sql, function(err, results, fields) {
      if (err) throw err;

      callback(results);
    });
    console.log(query.sql);

    connection.end();
  }

  static getCompositoresById(id, callback) {
    let connection = CompositoresDB.connect();

    let sql = "SELECT id, apelido, ano_nasc, ano_falec, loc_nasc, tipo, estilo FROM compositores WHERE id = ?";
    let query = connection.query(sql, id, function(err, results, fields) {
      if (err) throw err;

      if (results.length == 0) {
        console.log("Nenhum compositor encontrado...");
        return;
      }
      let compositor = results[0];
      callback(compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static save(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "INSERT INTO compositores SET ?";
    let query = connection.query(sql, compositor, function(err, results, fields) {
      if (err) throw err;

      compositor.id = results.insertId;
      callback(compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static update(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "UPDATE compositores set ? WHERE id = ?";
    let id = compositor.id;
    let query = connection.query(sql, [compositor, id], function(err, results, fields) {
      if (err) throw err;

      callback(compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static delete(compositor, callback) {
    let connection = CompositoresDB.connect();

    let sql = "DELETE FROM compositores WHERE id = ?";
    let id  = compositor.id;
    let query = connection.query(sql, id, function(err, results, fields) {
      if (err) throw err;

      callback(compositor);
    });
    console.log(query.sql);

    connection.end();
  }

  static deleteById(id, callback) {
    let connection = CompositoresDB.connect();

    let sql = "DELETE FROM compositores WHERE id = ?";
    let query = connection.query(sql, id, function(err, results, fields) {
      if (err) throw err;

      callback(results.affectedRows);
    });
    console.log(query.sql);

    connection.end();
  }
};

module.exports = CompositoresDB;