//@flow

import React from 'react';
import type { Node } from 'react';
import styles from './index.module.scss';

type Props = {
    children: Node
}

const Footer = ({ children }: Props) => (
    <footer className={ styles.root }>{ children }</footer>
);

export default Footer;
