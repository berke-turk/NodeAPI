const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs'
});

connection.connect((err) => {
    if (err) throw err;

    console.log("Is connected to database");
});
module.exports = connection;