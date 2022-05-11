import React from "react"
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import Facet from "../components/Facet";
import Product from '../components/Product';
import styles from '../styles/Find.module.scss'

export default function Find() {
    // Hora de sacar el query builder
    const [data, setData] = React.useState([]);
    const [filters, setFilters] = React.useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    React.useEffect(() => {
        const gender = searchParams.get("gender");
        const brand = searchParams.get("brand");
        const category = searchParams.get("category");
        axios.post('/clothes', {
            gender,
            brand, 
            category            
        }).then(({data}) => {setData(data.clothes); populateFacet(data.clothes);});
    }, [searchParams]);

    function populateFacet(data) {
        var filters = {
            "category": {},
            "brand": {},
            "gender": {},
        };
        data.map((item) => {
            filters["category"][item.category_id] = filters["category"][item.category_id] + 1 || 1;
            filters["brand"][item.brand_id] = filters["brand"][item.brand_id] + 1 || 1;
            filters["gender"][item.gender_id] = filters["gender"][item.gender_id] + 1 || 1;
        });
        setFilters(filters);
    }
    function renderFilters(key) {
        if(Object.keys(filters[key]).length > 0) {
            let num = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
            return <Facet key={num} id={key} data={filters[key]} />
        }
    }
    
    return <>
        {data.length <= 0 && <div className={styles.idle_box}>
            <span>Nada que ver aquí, por ahora...
            <img src="/logo.svg" /></span>
            </div>}
        {data.length > 0 && <div className={styles.main}>
            <div className={styles.facet_wrapper}>
                <p>Lista de filtros</p>
                {Object.keys(filters).map((key) => renderFilters(key))}
            </div>
            <div className={styles.product_wrapper}>
                {data.map((item) => {
                    return <Product key={item.clothes_id} clothes={item} />
                })}
            </div>
        </div>
        }
    </>
}