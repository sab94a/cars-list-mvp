// @flow

import React from 'react';
import { Button as ButtonType } from 'components/lib/types'
import styles from './index.module.scss';

const Button = ({ children, ...rest }: ButtonType) => (
    <button {...rest } className={ styles.root } >{ children }</button>
);

export default React.memo(Button)
