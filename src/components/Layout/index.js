//@flow

import React from 'react';
import type { Node } from 'react'

export type Props = {
    children: Node
}

const Layout = ({ children }: Props) => (
    <>
        <header>Header</header>
        <main>{ children }</main>
        <footer>Footer</footer>
    </>
);

export default Layout;
