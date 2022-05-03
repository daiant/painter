import { Link } from 'react-router-dom';
import styles from '../styles/Footer.module.scss'; 

export default function Footer() {
    return <>
        <div className={styles.main}>
            <div className={styles.links}>
                <ul>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                </ul>
            </div>
            <div className={styles.links}>
                <ul>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                    <li><Link to="">Pagina 1</Link></li>
                </ul>
            </div>
            <div className={styles.logo}>
                <img src="/logo-white.svg"></img>
            </div>
        </div>
    </>
}