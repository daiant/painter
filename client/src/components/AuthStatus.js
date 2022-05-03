import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";


export default function AuthStatus() {
    let auth = useContext(AuthContext);
    let navigate = useNavigate();

    if(!auth.auth.accessToken) {
        return <p>You are not logged in</p>
    }
    function signout() {
        auth.setAuth({})
        navigate("/")
    }
    return (
        <p>
            Welcome {auth.auth.user}!{" "}
            <button onClick={signout}>
                Sign out
            </button>
        </p>
    )
}