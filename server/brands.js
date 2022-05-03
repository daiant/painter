const {pool} = require('./db');

module.exports =  {
    getBrand: async function getBrand(brand) {
        if (brand === undefined || brand === "") {
            return;
        }
        let text = `SELECT brand_id FROM brands WHERE name = $1`;
        let values = [brand];

        const res = await pool.query(text, values);
        try {
            return res.rows[0].brand_id;
        } catch(e) {
            return;
        }
    }
}