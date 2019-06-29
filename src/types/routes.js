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
