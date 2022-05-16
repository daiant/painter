import styles from '../styles/Search.module.scss'
import React, { useEffect } from 'react';
import axios from "../api/axios";
import { Link, useLocation } from 'react-router-dom'
export default function Search() {
    const [query, setQuery] = React.useState("");
    const [focus, setFocus] = React.useState(false);
    const [results, setResults] = React.useState([]);
    const location = useLocation();

    
    useEffect(() => {
        // Close search bar
        setQuery("");
        setResults([]);
        setFocus(false);
    }, [location]); 

    function onFocusInput() {
        // placeholder para moviles
        setFocus(true);
    }
    function handleBlur(event) {
        if(!event.currentTarget.contains(event.relatedTarget)) {
            setFocus(false);
        }
    }
    function getProducts(q) {
        const query = q.target.value
        setQuery(query);
        if(query === "") {
            setResults([]);
            console.log("añdlskfj")
        } else {
            axios.post('/query', {
                query
            }).then(({data}) => {
                setResults(data.clothes);
            })
        }
    }
    return <>        
        {/* <label>Buscar ropita</label>
        <img src="/painter/search.png" /> */}
        <div className={focus ? `${styles.wrapper} ${styles.focus}` : `${styles.wrapper}`} onBlur={handleBlur} onFocus={onFocusInput} onClick={onFocusInput}>
            <input type='text' className={styles.search} value={query} onChange={(newQuery) => getProducts(newQuery)} placeholder="Buscar ropita" />
            <ul className={styles.results}>
            {focus && <> {
                results.map((result) => {
                    return <li className={styles.result} key={result.clothes_id}><Link to={`/painter/product/${result.clothes_id}`} reloadDocument>{result.name}</Link></li>
                })}
                {query.length > 0 && <li className={styles.result}>Ver más <i>{query}</i></li>}            
            </>
            }
            
            </ul>
        </div>
    </>
}