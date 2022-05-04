import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.scss'; 

export default function Footer() {
    return <>
        <div className={styles.main}>
            <div className={styles.links}>
                <ul>
                    <li><Link to="">Inicio</Link></li>
                    <li><Link to="">Productos</Link></li>
                    <li><Link to="">Trabaja con nosotros</Link></li>
                    <li><Link to="">Contacto</Link></li>
                </ul>
            </div>
            <div className={styles.links}>
                <ul>
                    <li><Link to="">Aviso legal</Link></li>
                    <li><Link to="">Política de privacidad</Link></li>
                    <li><Link to="">Política de cookies</Link></li>
                    <li><Link to="">No me denunsien</Link></li>
                </ul>
            </div>
            <div className={styles.logo}>
                <Link to="/"><img src="/logo-white.svg"></img></Link>
            </div>
        </div>
    </>
}