const pg = require('pg');
const credentials = {
    user: "ldbuhaxbnjbclm", 
    host: "ec2-52-30-67-143.eu-west-1.compute.amazonaws.com", 
    database: "dfl8q82tcv7ret", 
    password: 'b951be9960529b8abe190494f08244114c90485201249e615dd6e78dc205886f', 
    port: 5432,
    ssl: { 
      rejectUnauthorized: false,
    }
}
const pool = new pg.Pool(credentials);

module.exports = {
    pool
}
