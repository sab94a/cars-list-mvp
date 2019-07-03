import Main from 'containers/Main';
import Car from 'containers/Car';
import Favourites from 'containers/Favourites';
import NotFound from 'components/pages/NotFound';

export const RoutesMap = {
    Root: {
        path: '/',
        exact: true,
        component: Main
    },
    Favourite: {
        path: '/favourite',
        component: Favourites
    },
    Car: {
        path: '/car/:id/',
        component: Car
    },
    NotFound: {
        component: NotFound
    }
};

export const Router = [RoutesMap.Root, RoutesMap.Favourite, RoutesMap.Car, RoutesMap.NotFound];

export const Navigation= [{
    title: 'Favourite',
    href: RoutesMap.Favourite.path
}, {
    title: 'Home',
    href: RoutesMap.Root.path
}];

// TODO: Keep all strings in config and pass it to components through React Context

export const Strings = {
    copyright: '© AUTO1 Group 2018'
}
