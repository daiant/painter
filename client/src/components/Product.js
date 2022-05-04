import styles from '../styles/Product.module.scss';
import React from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export default function Product(props) {
    const [img, setImg] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get(`/clothes-img/${props.clothes.clothes_id}`).then(({data}) => {
           setImg(data.images[0].url);
           setLoading(false);
        })
    }, [])
    return <>
        <Link to={`/product/${props.clothes.clothes_id}`}>
            <div className={styles.main}>
                <div className={loading ? `${styles.loading} ${styles.img}` : styles.img}>
                    <img src={loading ? "/loading.png" : img}></img>
                    <div className={styles.fav}>
                        <img src='/heart.png'></img>
                    </div>
                </div>
                <div className={styles.info}>
                    <div>{props.clothes.name.substring(0, 1).toUpperCase() + props.clothes.name.substring(1)}</div>    
                    <div className={styles.price}>
                        {props.clothes.sale_price && 
                            <div>
                                <span className={styles.sale}>{`${props.clothes.sale_price}`}</span>
                                <span className={styles.price}> {`${props.clothes.price.toString().replace(".", ",")} €`}</span>
                            </div>
                        }
                        {!props.clothes.sale_price &&
                            <div>{`${props.clothes.price.toString().replace(".", ",")} €`}</div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    </>
}