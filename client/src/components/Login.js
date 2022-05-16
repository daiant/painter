import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
const LOGIN_URL = '/auth';

export default function Login() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/painter";
    useEffect(() => {
        userRef.current.focus();
    }, []);
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pwd}), 
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true, 
                    
                });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const user_id = response?.data?.user_id;
            setAuth({user_id, user, pwd, roles, accessToken});
            setUser('')
            setPwd('');
            navigate(from, {replace: true})
            
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if(err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if(err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                console.log(err)
                setErrMsg('Nopi');
            }
            errRef.current.focus();
        }
    }
    return (
        <>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input 
                    type="text" id="username" ref={userRef} autoComplete="off" 
                    onChange={(e) => setUser(e.target.value)} value={user} required
                />
                <label htmlFor='password'>Password</label>
                <input 
                    type="password" id="password"
                    onChange={(e) => setPwd(e.target.value)} value={pwd} required
                />
                <button>Sign in</button>
            </form>
        </section>    
        </>
    )
}