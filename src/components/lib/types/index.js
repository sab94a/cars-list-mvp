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

export type Link = {
    children: React$Node,
    href: Path,
    className?: ?string
}

export type Navigation = {
    items: Array<NavItem>
}

export type Paginator = {
    total: number,
    active: number,
}

export type SelectItem = {
    value: string,
    title: string
}

export type Select = {
    value: ?string,
    placeholder: string,
    label: ?string,
    options: Array<SelectItem>,
    className?: string,
    onChange: (value: ?string) => void
}

export type Button = {
    children: React$Node
}