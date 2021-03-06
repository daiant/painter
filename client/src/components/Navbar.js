import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.scss';
import Search from './Search';

export default function Navbar() {
    return <>
        <main className={styles.navbar}>
            <div className={styles.top}>
                <div className={styles.logo}>
                    <Link to="/painter"><img src="/painter/logo.svg" alt="Logo" /></Link>
                </div>
                <Search />
                <div className={styles.user_actions}>
                    <ul>
                        <li><Link to="/painter/favorites" title='Favoritos'><img src="/painter/heart.png" alt="icono de un corazón"></img></Link></li>
                        <li><Link to="/painter/user" title='Perfil'><img src="/painter/user.png" alt="icono de un usuario"></img></Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.categories}>
                <ul>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
                            search: "?gender=7"
                        }}>
                            Hombre
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
                            search: "?gender=6"
                        }}>
                            Mujer
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
                            search: "?gender=15"
                        }}>
                            Niña
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
                            search: "?gender=4"
                        }}>
                            Niño
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
                            search: "?category=1"
                        }}>
                            Zapatos
                        </Link>
                    </li>
                    <li>
                        <Link to={{
                            pathname: "/painter/find",
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