const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the connection when server boots
db.getConnection((err, connection) => {
  if (err) {
    console.error(' Database connection failed:', err.message);
  } else {
    console.log(' Connected to the MySQL database!');
    connection.release(); // let go of test connection
  }
});

module.exports = db.promise(); // enables async/await with db.execute