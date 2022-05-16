const { pool } = require('./db'); 

module.exports = {
    getUser: async function(username, password) {
        const text = `SELECT * from users WHERE username = $1 AND password = $2`;
        const values = [username, password];
        const res = await pool.query(text, values);

        try {
            return res.rows[0];
        } catch(e) {
            return {};
        }
    }
}