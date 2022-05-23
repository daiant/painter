const pg = require('pg');
const credentials = {
    user: "bwspjcvcbiswyz", 
    host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com", 
    database: "ddrfc8p3krbeb9", 
    password: '1e29548d9fb5baeaa641b8d4f4e6ceb7f8540e8893e732c10300e0921925969e', 
    port: 5432,
    ssl: { 
      rejectUnauthorized: false,
    }
}
const pool = new pg.Pool(credentials);

module.exports = {
    pool
}
