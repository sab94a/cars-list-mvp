// @flow

import React from 'react';
import cx from 'classnames';
import type { Node, AbstractComponent } from 'react';
import type { Path } from 'components/lib/types';
import styles from './index.module.scss';

type Props = {
    children: Node,
    href: Path
}

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
