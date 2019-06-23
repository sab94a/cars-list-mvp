// @flow

import React from 'react';
import Link from  'components/lib/Link';
import type { NavItem } from 'components/lib/types';
import styles from './index.module.scss';

type Props = {
    items: Array<NavItem>
};

const Navigation = ({ items }: Props) => (
    <nav className={ styles.root }>
        { items.map(({ href, title }:NavItem, index:number) => (
            <Link key={ index } href={ href } className={ styles.link }>{ title }</Link>
        )) }
    </nav>
);

export default React.memo<Props>(Navigation);
