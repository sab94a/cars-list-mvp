//@flow 

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

export type SelectItem = {
    value: string,
    title: string
}

export type Select = {
    defaultValue: string,
    placeholder: ?string,
    options: Array<React$Node>
}

export type Button = {
    children: React$Node
}