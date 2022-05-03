const pg = require('pg');
const credentials = {
    user: "davi", 
    host: "localhost", 
    database: "davi", 
    password: 'davi', 
    port: 5432
}
const pool = new pg.Pool(credentials);

module.exports = {
    pool
}