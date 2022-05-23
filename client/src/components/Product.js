import styles from '../styles/Product.module.scss';
import React from 'react'
import axios from '../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

export default function Product(props) {
    const [img, setImg] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const auth = React.useContext(AuthContext);
    const [favorite, setFavorite] = React.useState(false);
    const navigate = useNavigate(); 
    const location = useLocation();

    React.useEffect(() => {
        axios.get(`/clothes-img/${props.clothes.clothes_id}`).then(({data}) => {
           setImg(data.images[0].url);
           setLoading(false);
        });
        if(Object.keys(auth.auth).length > 0) {
            axios.post(`/favorite`, {
                clothes_id: props.clothes.clothes_id,
                user_id: auth.auth.user_id
            }).then(({data}) => {
                setFavorite(data.favorite)
            });
        }
    }, []);
    function clickMe(e) {
        e.preventDefault();
        // props.clothes.clothes_id
        // 
        if(Object.keys(auth.auth).length <= 0) {
            navigate('/painter/login', {replace: false, });
        } else {
            axios.post("/set-favorite", {
                clothes_id: props.clothes.clothes_id,
                user_id: auth.auth.user_id,
                action: favorite
            }).then(({data}) => setFavorite(!favorite))
        }
    }

    return <>
        <div style={{display: 'inline-block'}}>
        <Link to={`/painter/product/${props.clothes.clothes_id}`}>
            <div className={styles.main}>
                <div className={loading ? `${styles.loading} ${styles.img}` : styles.img}>
                    <img src={loading ? "/painter/loading.png" : img}></img>
                    <div className={styles.fav} onClick={(e) => clickMe(e)}>
                        <img src={favorite ? '/painter/heart_filled.png' : '/painter/heart.png'}></img>
                    </div>
                </div>
                <div className={styles.info}>
                    <div>{props.clothes.name.substring(0, 1).toUpperCase() + props.clothes.name.substring(1)}</div>    
                    <div className={styles.price}>
                        {props.clothes.sale_price && 
                            <div>
                                {/* <span className={styles.sale}>{`${props.clothes.sale_price}`}</span> */}
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
        </div>
    </>
}