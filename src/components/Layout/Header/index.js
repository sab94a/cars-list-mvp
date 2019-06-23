//@flow

import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from 'components/lib/Navigation';
import Logo from 'components/lib/Logo';
import type { NavItem } from 'components/lib/types';
import styles from './index.module.scss'

type Props = {
    navigation: Array<NavItem>
};

const Header = ({ navigation }: Props) => (
    <header className={ styles.root }>
        <Link className={ styles.logo } to='/'>
            <Logo />
        </Link>
        <Navigation items={ navigation } />
    </header>
);

export default React.memo<Props>(Header);
