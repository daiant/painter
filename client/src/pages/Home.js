import Banner from "../components/Banner";
import Brand from "../components/Brand";

import React from 'react';
import axios from "../api/axios";
import Product from "../components/Product";

export default function Home() {
    const [clothes, setClothes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() =>  {
        axios.post("/clothes", {max: 8}, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then(({data}) => {
            setClothes(data.clothes);
            setLoading(false);
        });
    }, [])
    return <>
        <Banner
            src="/painter/banner.jpg"
            title="Painter"
            subtitle="Encuentra toda la ropa de todas las marcas"
        />
        <Brand 
            src="/painter/springfield.jpg"
            name="Springfield"
            id="1"
        />
        <section className="most-wanted container">
            <h2>Los más vendidos</h2>
            <div className="product-banner">
                {!loading && <>
                    {clothes.map((item, index) => {
                    return <div key={index} className="product-wrapper"><Product clothes={item} /></div>
                })} 
                </>}
            </div>
        </section>
    </>
}