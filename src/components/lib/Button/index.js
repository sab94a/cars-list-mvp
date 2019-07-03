// @flow

import React from 'react';
import type { Button as Props} from 'components/lib/types'
import styles from './index.module.scss';

const Button = ({ children, ...rest }: Props) => (
    <button {...rest } className={ styles.root } >{ children }</button>
);

export default React.memo<Props>(Button)
