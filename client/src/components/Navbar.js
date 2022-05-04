import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';

export default function Navbar() {
    return <>
        <main className={styles.navbar}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <Link to="/"><img src="/logo.svg" alt="Logo" /></Link>
                </div>
                <div className={styles.search}>
                    Buscar ropita
                    <img src="/search.png" />
                </div>
                <div className={styles.user_actions}>
                    <ul>
                        <li><Link to=""><img src="/heart.png" alt="icono de un corazón"></img></Link></li>
                        <li><Link to=""><img src="/user.png" alt="icono de un usuario"></img></Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.categories}>
                <ul>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?gender=1"
                        }}>
                            Hombre
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?gender=5"
                        }}>
                            Mujer
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?gender=3"
                        }}>
                            Niña
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?gender=4"
                        }}>
                            Niño
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?category=1"
                        }}>
                            Zapatos
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/find",
                            search: "?category=2"
                        }}>
                            Complementos
                        </Link>
                    </li>
                </ul>
            </div>

        </main>
    </>
}