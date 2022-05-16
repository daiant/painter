import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

export default function User(props) {
    const auth = useContext(AuthContext);
    return <>
        <h1>Ei soy un usuario</h1>
        <p>Concretamente {auth.auth.user}</p>
    </>
}