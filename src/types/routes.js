//@flow

export type Route = {
    component?: React$ComponentType<*>,
    path?: string,
    exact?: boolean,
};
