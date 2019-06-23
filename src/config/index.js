import Main from 'components/pages/Main';
import Car from 'components/pages/Car';
import NotFound from 'components/pages/NotFound';

export const RoutesMap = {
    Root: {
        path: '/',
        exact: true,
        component: Main
    },
    Favourite: {
        path: '/favourite',
        component: Main
    },
    Car: {
        path: '/car/:id/',
        component: Car
    },
    NotFound: {
        component: NotFound
    }
};

const Router = [RoutesMap.Root, RoutesMap.Favourite, RoutesMap.Car, RoutesMap.NotFound];

const Navigation= [{
    title: 'Favourite',
    href: RoutesMap.Favourite.path
}, {
    title: 'Home',
    href: RoutesMap.Root.path
}];

const Strings = {
    copyright: '© AUTO1 Group 2018'
}

const Config = {
    Router,
    RoutesMap,
    Navigation,
    Strings
};

export default Config;
