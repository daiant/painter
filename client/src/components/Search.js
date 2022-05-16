import styles from '../styles/Search.module.scss'
import React from 'react';
import axios from "../api/axios";
export default function Search() {
    const [query, setQuery] = React.useState("");
    const [focus, setFocus] = React.useState(false);
    const [results, setResults] = React.useState([]);
    
    function onFocusInput() {
        setFocus(true);
    }
    function getProducts(q) {
        const query = q.target.value
        setQuery(query);
        axios.post('/query', {
            query
        }).then(({data}) => {
            console.log(data.clothes);
        })
    }
    return <>        
        {/* <label>Buscar ropita</label>
        <img src="/painter/search.png" /> */}
        <div className={focus ? `${styles.wrapper} ${styles.focus}` : `${styles.wrapper}`}>
            <input type='text' onBlur={() => setFocus(false)} onFocus={onFocusInput} onClick={onFocusInput} className={styles.search} value={query} onChange={(newQuery) => getProducts(newQuery)} placeholder="Buscar ropita" />
        </div>
    </>
}