import React from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import styles from '../styles/ProductPage.module.scss';

export default function ProductPage() {
    const [product, setProduct] = React.useState({});
    const [brand, setBrand] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [preview, setPreview] = React.useState(null);
    let { clothesId } = useParams();
    React.useEffect(() => {
        axios.get(`/clothes/${clothesId}`).then(({data}) => {
            setProduct(data.clothes);
            setBrand(data.brand);
            setGender(data.gender);
            setCategory(data.category)
        });
        axios.get(`/clothes-img/${clothesId}`).then(({data}) => {
            setImages(data.images);
            setPreview(data.images[0].url)
        });
    }, [])
    
    return <>
        <section id="product-page-section">
            <div className={styles.product_wrapper}>
                <div className={styles.img_wrapper}>
                <div className={styles.thumbnails}>
                    {images.map((item, index) => {
                        return <div key={index} className={styles.thumbnail} onClick={(e) => setPreview(e.target.src)}>
                            <img src={item.url} />
                        </div>
                    })}
                </div>
                <div className={styles.preview_img}>
                        {preview && <>
                            <img src={preview} />
                        </>}
                </div>
                </div>
                {product && <>
                    <div className={styles.buyout_wrapper}>
                        <div className={styles.title}>{product.name}</div>
                        <div className={styles.brand}>{brand}</div>
                        <div className={styles.prices}>
                            
                            {product.sale_price && <span className={styles.sale_price}>{product.sale_price.toString().replace(".", ",")}</span>}
                            <span className={styles.price}>{product.price} €</span>
                        </div>
                        <div>{category} - {gender}</div>
                        
                        <div className={styles.sizes}>
                            <span>Selecciona tu talla: {product.size !== undefined && JSON.parse(product.size).length <= 0 ? "Talla única": ""}</span>
                            <ul>
                            {
                                product.size !== undefined && JSON.parse(product.size).map((item) => {
                                    return <li className={item.disabled ? `${styles.size} ${styles.disabled}` : styles.size} key={item.size}><div  >{item.size}</div></li>
                                })
                            }
                            </ul>
                             
                        </div>
                        <div className={styles.buy_action}>
                            <div className={`${styles.buy} ${styles.button}`}>Comprar</div>
                            <div className={`${styles.fav} ${styles.button}`}>Añadir a favoritos <img src="/heart.png"></img></div>
                        </div>
                        <p>{product.description}</p>
                       
                        
                    </div>
                </>}
            </div>
            <div className={styles.more_info}>

            </div>
        </section>
    </>
}