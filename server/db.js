const pg = require('pg');
const devCredentials = {
    user: "davi", 
    host: "localhost", 
    database: "davi", 
    password: 'davi', 
    port: 5432,
    ssl: { 
      rejectUnauthorized: false,
    }
}
const connectionString = 'postgresql://bwspjcvcbiswyz:1e29548d9fb5baeaa641b8d4f4e6ceb7f8540e8893e732c10300e0921925969e@ec2-52-30-159-47.eu-west-1.compute.amazonaws.com:5432/ddrfc8p3krbeb9';

const pool = new pg.Pool(devCredentials);

module.exports = {
    pool
}
