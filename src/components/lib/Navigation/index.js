// @flow

import React from 'react';
import Link from  'components/lib/Link';
import type { Navigation as Props } from 'components/lib/types';
import styles from './index.module.scss';

const Navigation = ({ items }: Props) => (
    <nav className={ styles.root }>
        { items.map(({ href, title }, index) => (
            <Link key={ index } href={ href } className={ styles.link }>{ title }</Link>
        )) }
    </nav>
);

export default React.memo<Props>(Navigation);
