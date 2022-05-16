const express = require('express');
const cors = require('cors');
const { getClothesFromBrand, getImgFromClothes, getClothes, getUniqueClothes } = require('./clothes');
const { getBrandName } = require('./brands');
const { getGenderName } = require('./gender');
const { getCategoryName } = require('./category');
const { pool } = require('./db');
const  { getUser } = require('./auth');
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT || 8443;

const app = express();

https.createServer({key: fs.readFileSync('my_cert.key'), cert: fs.readFileSync('my_cert.crt')}, app).listen(PORT, function() {console.log('https ready');});

app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.use(cors());
app.post('/auth', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    const user = await getUser(req.body.user, req.body.pwd);
    console.log(user);
    if(user !== undefined && user !== {}) {
        res.json({
            roles: [1],
            accessToken: 1
        });
    } else {
        res.status(401).send({msg: "Unauthorized"});
    }
});
app.get('/clothes/:id', async(req, res) => {
    const clothes = await getUniqueClothes(req.params.id);
    const brand = await getBrandName(clothes.brand_id);
    const gender = await getGenderName(clothes.gender_id);
    const category = await getCategoryName(clothes.category_id);

    return res.json({
        clothes: clothes,
        brand: brand,
        gender: gender, 
        category: category
    });
});
app.post('/clothes', async (req, res) => {
    let request = req.body;
    var query = "SELECT * FROM clothes";
    var values = [];

    if(request.gender || request.brand || request.category) {
        query += " WHERE";
    }
    if(request.gender) {
        if(values.length > 0) query+= " AND";
        query += ` gender_id = $${1+values.length}`
        values.push(request.gender);
    }
    if(request.brand) {
        if(values.length > 0) query+= " AND";
        query += ` brand_id = $${1+values.length}`
        values.push(request.brand);
    }
    if(request.category) {
        if(values.length > 0) query+= " AND";
        query += ` category_id = $${1+values.length}`
        values.push(request.category);
    }
    if(request.max) {
        query += ` LIMIT $${1+values.length}`;
        values.push(request.max);
    };

    const response = await pool.query(query, values);
    return res.json({
        clothes: response.rows
    })
});
app.get('/clothes-img/:id', async(req, res) => {
    return res.json({
        images: await getImgFromClothes(req.params.id, 10)
    });
})
app.get('/api', (req, res) => {
    return res.json({"message" : "Hello from server!"});
});

app.get('/category/:id', async(req, res) => {
    return res.json({
        name: await getCategoryName(req.params.id)
    });
});

app.get('/brand/:id', async(req, res) => {
    return res.json({
        name: await getBrandName(req.params.id)
    });
});

app.get('/gender/:id', async(req, res) => {
    return res.json({
        name: await getGenderName(req.params.id)
    });
});
app.get('/', async(req,res) => { return res.json({msg: "hola mundo"}); });
