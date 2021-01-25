const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'password',
    database: 'forum-app'
});

module.exports = {
    initialise: () => connection.connect(),
    query: util.promisify(connection.query).bind(connection)
}