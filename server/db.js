const mysql = require("mysql2/promise");


const pool = mysql.createPool({
  host: "localhost",
  user: "scot",
  password: "tiger",
  database: "AuthTest",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
