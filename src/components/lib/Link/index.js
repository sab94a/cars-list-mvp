// @flow

import React from 'react';
import type { Node, AbstractComponent } from 'react';
import type { Path } from 'components/lib/types';

type Props = {
    children: Node,
    href: Path
}

class Link extends React.Component<Props> {
    static Component: AbstractComponent<*> | string = 'a';

    render() {
        const { href, children, ...rest } = this.props;

        return (
            <Link.Component { ...rest } href={ href }>{ children }</Link.Component>
        );
    }
}

export default Link;
