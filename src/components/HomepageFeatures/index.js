import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Politique de développement de l\'Abes',
        Svg: require('../../../static/img/logo-abes-cercle-130x130.svg').default,
        description: (
            <>
                <p>
                    Version non éditable de la politique de développement de l'Abes
                </p>
                <p>
                    <br/>Pour toute question ou remarque, vous pouvez écrire à <a href="mailto:abes@abes.fr">abes@abes.fr</a>
                </p>
            </>
        ),
    },

];

function Feature({title, description}) {
    return (
        <div className={clsx('col')}>
            {/*<div className="text--center">*/}
            {/*    <Svg className={styles.featureSvg} role="img" />*/}
            {/*</div>*/}
            <div className="padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>

        </section>
    );
}
