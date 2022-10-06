import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  imgSrc: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Recurrent features already there',
    imgSrc: require('@site/static/img/sack.png').default,
  },
  {
    title: 'Configured tools',
    imgSrc: require('@site/static/img/tools.png').default,
  },
  {
    title: 'Fixes the learnings of all the teams',
    imgSrc: require('@site/static/img/brain.png').default,
  },
];

function Feature({ title, imgSrc }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImg} src={imgSrc} role="img" />
      </div>
      <div className="text--center">
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <div>
          <a href="/docs" className={styles.documentationLink}>
            <span className={styles.documentationLinkText}>
              Documentation for Bifrost
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
