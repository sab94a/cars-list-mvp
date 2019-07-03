// @flow

import React from 'react';
import cx from 'classnames';
import type { AbstractComponent } from 'react';
import type { Link as Props } from 'components/lib/types';
import styles from './index.module.scss';

class Link extends React.Component<Props> {
    static Component: AbstractComponent<*> | string = 'a';

    render() {
        const { href, children, className, ...rest } = this.props;

        return (
            <Link.Component className={cx( className, styles.root )} { ...rest } href={ href }>{ children }</Link.Component>
        );
    }
}

export default Link;
