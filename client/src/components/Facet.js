import React from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import styles from '../styles/Facet.module.scss';

export default function Facet(props) {
    const [names, setNames] = React.useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const locale = {
        category: "Categoría",
        brand:    "Marca",
        gender:   "Género",
    }
    React.useEffect(() => {
        async function renderNames() {
            const values = {};
            for(let item of Object.keys(props.data)) {
                var name = await getName(item, props.id).then((name) => name);
                values[item] = name;
            };
            setNames(values);
        }
        renderNames();
        // Get checked boxes
    }, []);
    function changeSelection(event) {
        const urlSearchParams = new URL(window.location.href).searchParams;
        const [key, item] = event.target.value.split("_");
        if(event.target.checked) {
            urlSearchParams.append(key, item);
        } else {
            var items = urlSearchParams.getAll(key);
            urlSearchParams.delete(key);
            items.map((x) => {if(x != item){urlSearchParams.append(key, x)}});
        }

        setSearchParams(urlSearchParams)
        
    }
    function getName(item, key) {
        var promise = new Promise(function(resolve, reject) {
            resolve(axios.get(`/${key}/${item}`).then(({data}) => data.name));
        });
        return promise;
    }
    function title(s) {
        try {
            return locale[s].substring(0,1).toUpperCase() + locale[s].substring(1);
        } catch(e) {
            return s.substring(0,1).toUpperCase() + s.substring(1);
        }
    }
    return <> 
        <div className={styles.checkbox_wrapper}>
            <p className={styles.title_facet}>{title(props.id)}</p>
            {Object.keys(props.data).map((item) => {
                return <div className={styles.checkbox} key={item}>
                    <label>
                        <input type="checkbox" value={`${props.id}_${item}`} onChange={changeSelection} checked={searchParams.getAll(props.id).includes(item)}/>
                        {`${names[item]} (${props.data[item]})`}
                    </label>                
                </div>
            })}
        </div>
    </>
}