const mysql = require("mysql2");

let pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123@indreshH",
  database: "mydb",
});

module.exports = { pool };
