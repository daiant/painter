import styles from '../styles/Banner.module.scss';

export default function Banner(props) {
    return <>
        <div className={styles.main}>
            <img src={props.src} />
            <div className={styles.text}>
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        </div>
    </>
}