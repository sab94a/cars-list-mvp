//@flow

import React from 'react';
import type { Node } from 'react';
import type { NavItem } from 'components/lib/types';
import Header from './Header';
import Footer from './Footer';
import styles from './index.module.scss';

export type Props = {
    children: Node,
    navigation: Array<NavItem>,
    footerText: string
};

const Layout = ({ children, navigation, footerText }: Props) => (
    <div className={ styles.root }>
        <Header navigation={ navigation } />
        <main className={ styles.content }>{ children }</main>
        <Footer>{ footerText }</Footer>
    </div>
);

export default Layout;
