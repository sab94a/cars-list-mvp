//@flow 

import type { AbstractComponent } from 'react';

export type Path = string;

export type Title = string;

export type NavItem = {
    title: Title,
    href: Path
};

export type Card = {
    image?: string,
    title?: string,
    description?: string,
    loading?: boolean,
    footer?: React$Node,
    elemType?: string
}
