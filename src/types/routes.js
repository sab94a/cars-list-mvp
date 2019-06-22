//@flow

export type Route = {
    component?: React$ComponentType<*>,
    path?: string | Array<string>,
    exact?: boolean,
}