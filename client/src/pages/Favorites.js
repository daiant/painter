import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function Favorites() {
    const auth = useContext(AuthContext).auth;
    return "Favoritos!!"
}