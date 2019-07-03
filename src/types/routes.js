//@flow

export type Route = {
    component?: React$ComponentType<*>,
    path?: string,
    exact?: boolean,
};

export type PagesNavigation = {
    shownItems: number,
    totalItems: number,
    totalPages: number,
    page: number
}

export type Match = {
    params: {
        [string]: string
    }
}

export type RouterHistory = {
    push(path: string | mixed): void,
}

export type RouterProps = {
    match: Match,
    location: Location,
    history: RouterHistory
}