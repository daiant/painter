const express = require('express');
const cors = require('cors');
const { getClothesFromBrand, getImgFromClothes, getClothes } = require('./clothes');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'})); 
app.post('/auth', (req, res) => {
    console.log("Todo bien");
    console.log(req.body);
    res.json({
        roles: [1],
        accessToken: 1
    });
});

app.post('/clothes', async (req, res) => {
    let request = req.body;
    if(request.brand) {
        return res.json({
            clothes: await getClothesFromBrand(request.brand, request.max)
        });
    } else if(request.max) {
        return res.json({
            clothes: await getClothes(request.max)
        })
    }
});
app.post("/clothes-img", async (req, res) => {
    let request = req.body;
    if(request.clothes_id) {
        return res.json({
            img: await getImgFromClothes(request.clothes_id, request.max)
        })
    }
})
app.get('/api', (req, res) => {
    return res.json({"message" : "Hello from server!"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});