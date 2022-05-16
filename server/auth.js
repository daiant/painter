const { pool } = require('./db'); 

module.exports = {
    getUser: function(username, password) {
        const text = `SELECT * from users WHERE username = $1 AND password = $2`;
        const values = [username, password];
        const res = pool.query(text, values);

        try {
            return res.rows[0];
        } catch(e) {
            return -1;
        }
    }
}