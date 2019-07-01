//@flow

import React from 'react';
import Link from 'components/lib/Link';
import Logo from 'components/lib/Logo';
import styles from './index.module.scss';

const NotFound = () => (
    <div className={ styles.root }>
        <div className={ styles.wrapper }>
            <Logo />
            <h1 className={ styles.title }>404 - Not Found</h1>
            <p className={ styles.note }>Sorry, the page you are looking for does not exist.</p>
            <p className={ styles.note }>You can always go back to the <Link href="/">homepage.</Link></p>
        </div>
    </div>
)

export default NotFound;
