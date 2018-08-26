//MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 8889,
  host: "localhost",
  user: "root",
  password: "root",
  database: "burgers_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
  console.log("connected as id " + connection.threadId);
});

//Export connection for ORM to use.
module.exports = connection;