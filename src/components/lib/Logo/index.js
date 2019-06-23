// @flow

import React from 'react';
import logo from './logo.png';
import styles from './index.module.scss';

const Logo = () => (
    <img className={ styles.root } alt="Logo" src={ logo } />
);

export default Logo;
