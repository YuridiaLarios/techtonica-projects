//require packages
const db = require("pg");
const keys = require('./keys')

// create PostgreSQL connection
const connection = new db.Client({
  host: "localhost",
  port: 5000,
  database: "eventonica"
});

module.exports = connection;