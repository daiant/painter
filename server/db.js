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
const connectionString = 'postgresql://bwspjcvcbiswyz:1e29548d9fb5baeaa641b8d4f4e6ceb7f8540e8893e732c10300e0921925969e@ec2-52-30-159-47.eu-west-1.compute.amazonaws.com:5432/ddrfc8p3krbeb9';

const pool = new pg.Pool({connectionString, ssl: {rejectUnauthorized: false}});

module.exports = {
    pool
}
