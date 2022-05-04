const {pool} = require('./db');

module.exports =  {
    getGenderName: async function(id) {
        let text = `SELECT name FROM genders WHERE gender_id = $1`;
        let values = [id];
        const res = await pool.query(text, values);
        try {
            return res.rows[0].name;
        } catch(e) {
            return;
        }

    }
}