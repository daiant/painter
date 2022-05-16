const express = require('express');
const cors = require('cors');
const { getClothesFromBrand, getImgFromClothes, getClothes, getUniqueClothes } = require('./clothes');
const { getBrandName } = require('./brands');
const { getGenderName } = require('./gender');
const { getCategoryName } = require('./category');
const { pool } = require('./db');
const  { getUser, getFavoritesFromUser, getIsClothesFavorite, setFavorite } = require('./user');
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
    if(user !== undefined && user !== {}) {
        res.json({
            roles: [1],
            accessToken: 1,
            user_id: user.user_id
        });
    } else {
        res.status(401).send({msg: "Unauthorized"});
    }
});

app.get('/favorites/:id', async(req, res) => {
    const clothes = await getFavoritesFromUser(req.params.id);

    return res.json({
        clothes
    })
});

app.post('/set-favorite', async(req, res) => {
    const response = await setFavorite(req.body.clothes_id, req.body.user_id, req.body.action);
    res.send("done");
})

app.post('/favorite', async(req, res) => {
    const isFavorite = await getIsClothesFavorite(req.body.clothes_id, req.body.user_id);
    console.log(isFavorite);
    console.log(req.body.clothes_id);
    console.log(req.body.user_id);
    return res.json({
        favorite: isFavorite == 1
    })
})

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
app.post('/query', async (req, res) => {
    let request = req.body.query;
    var text = `SELECT * FROM clothes WHERE name LIKE $1`;
    var values = ["'% " + request + " %'"]

    const response = await pool.query(text, values);
    console.log(response.rows);
    return res.json({
        clothes: response.rows
    })
})
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
