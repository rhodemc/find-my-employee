// dependencies
require("dotenv").config();
const mysql = require("mysql2");

// connect to database
const dbConnection = mysql.createConnection(
  {
    // either need to use 127.0.0.1 or localhost
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// export connection
module.exports = dbConnection;
