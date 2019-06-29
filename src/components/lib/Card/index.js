// @flow

import React from 'react';
import cx from 'classnames';
import type { Card as Props} from 'components/lib/types';
import styles from './index.module.scss';

const Card = ({ image, title, description, footer, loading, elemType = 'div' }: Props) => {
    const rootClasses = cx(styles.root, { [styles.loading]: loading });
    const imageStyle = { backgroundImage: loading || !image ? null : `url(${ image })` }
    const Component = elemType
    return (
        <Component className={ rootClasses }>
            <div className={ styles.image } style={ imageStyle } />
            <div className={ styles.content }>
                <h3 className={ styles.title }>{ title }</h3>
                <p className={ styles.description }>{ description }</p>
                <div className={ styles.footer }>
                    { footer }
                </div>
            </div>
        </Component>
    );
};

export default React.memo<Props>(Card);
