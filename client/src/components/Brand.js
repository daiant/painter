import styles from '../styles/Brand.module.scss';
import React from 'react';
import axios from '../api/axios';
import Product from './Product';
export default function Brand(props) {
    const [clothes, setClothes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        axios.post('/clothes', {
            brand: props.name.toLowerCase(),
            max: 10
        }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        }).then(({data}) => {
            setClothes(data.clothes);
            setLoading(false);
        })
    }, [])
    return <>
        <div className={styles.main}>
            <div className={styles.banner}>
                <img src={props.src} />
                <h2 className={styles.title}>{props.name}</h2>
            </div>
            <div className={styles.products}>
                {loading && <>
                    Loading...
                </>}
                {!loading && <>
                    <ul>
                    {clothes.map((item, index) => {
                        return <li key={index}>
                            <Product  clothes={item} />
                        </li>
                    })}
                    </ul>
                </>}
                
            </div>
        </div>
    </>
}