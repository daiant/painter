const { getBrand } = require("./brands");
const {pool} = require('./db');

module.exports = {
    getClothesFromBrand: async function(brand, max) {
        if (brand === undefined || brand === "") {
            return;
        }
        let brand_id = await getBrand(brand);
        if(brand_id) {
            let text = `SELECT * FROM clothes WHERE brand_id = $1 LIMIT $2`;
            let values = [brand_id, max || 99];
            const res = await pool.query(text, values);
            
            return res.rows;
        } else {
            return [];
        }
    },
    getImgFromClothes: async function(id, max) {
        if(id) {
            let text = `SELECT url FROM images WHERE clothes_id = $1 LIMIT $2`
            let values = [id, max || 9];
            const res = await pool.query(text, values);

            return res.rows[0].url;
        }
        return "";
    },
    getClothes: async function(max) {
        let text = `SELECT * FROM clothes LIMIT $1`;
        let values = [max || 20];
        const res = await pool.query(text, values);

        return res.rows;
    }
}