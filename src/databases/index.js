const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  host:process.env.MYSQL_HOST ,
  user:process.env.MYSQL_USER ,
  password:process.env.MYSQL_PASSWORD ,
  database:process.env.MYSQL_DATABASE ,
  port:process.env.MYSQL_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports=connection