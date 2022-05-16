import React from "react";
import axios from "../api/axios";
import Product from "../components/Product";
import AuthContext from "../context/AuthProvider";

export default function Favorites() {
    const auth = React.useContext(AuthContext).auth;
    const [favorites, setFavorites] = React.useState([]);
    React.useEffect(() => {
        axios.get(`/favorites/${auth.user_id}`).then(({data}) => {
            if(data.clothes) {
                setFavorites(data.clothes)
            }
        })
    }, [])
    return <>
        <h2>Favoritos</h2>
        {favorites !== [] && favorites.map((favorite) => {
            return <Product key={favorite.clothes_id} clothes={favorite} />
        })}
        {favorites === [] && <div>Loading...</div>}
    </>
}