import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.scss'; 

export default function Footer() {
    return <>
        <div className={styles.main}>
            <div className={styles.links}>
                <ul>
                    <li><Link to="/painter/">Inicio</Link></li>
                    <li><Link to="/painter/">Productos</Link></li>
                    <li><Link to="/painter/">Trabaja con nosotros</Link></li>
                    <li><Link to="/painter/">Contacto</Link></li>
                </ul>
            </div>
            <div className={styles.links}>
                <ul>
                    <li><Link to="/painter/">Aviso legal</Link></li>
                    <li><Link to="/painter/">Política de privacidad</Link></li>
                    <li><Link to="/painter/">Política de cookies</Link></li>
                    <li><Link to="/painter/">No me denunsien</Link></li>
                </ul>
            </div>
            <div className={styles.logo}>
                <Link to="/painter"><img src="/painter/logo-white.svg"></img></Link>
            </div>
        </div>
    </>
}