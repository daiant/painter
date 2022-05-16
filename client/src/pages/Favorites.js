import React from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider";

export default function Favorites() {
    const auth = React.useContext(AuthContext).auth;
    const [favorites, setFavorites] = React.useState({});
    console.log(auth);
    React.useEffect(() => {
        axios.get(`/favorites/${auth.user_id}`).then(({data}) => console.log(data))
    }, [])
    return "Favoritos!!"
}