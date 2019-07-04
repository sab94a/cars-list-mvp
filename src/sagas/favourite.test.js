import { put, select, takeEvery } from "@redux-saga/core/effects";

import { GET_FAVOURITE, ADD_FAVOURITE, REMOVE_FAVOURITE } from 'constants/actions';
import { FAVOURITE_KEY, SORTINGS } from 'constants/api';
import { updateFavourite } from 'actions';

import rootFavouriteSaga, { getFavourite, addFavourite, removeFavourite } from './favourite';

describe('Root Favourite Saga', () => {
    const saga = rootFavouriteSaga();

    it('Should add GET_FAVOURITE listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(GET_FAVOURITE, getFavourite));
    });

    it('Should add ADD_FAVOURITE listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(ADD_FAVOURITE, addFavourite));
    });

    it('Should add REMOVE_FAVOURITE listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(REMOVE_FAVOURITE, removeFavourite));
    });
});

const favourites =  {
    1: {
        color: 'white',
        manufacturerName: 'Audi',
        mileage: { number: 10 },
        stockNumber: 1
    },
    2: {
        color: 'black',
        manufacturerName: 'Audi',
        mileage: { number: 30 },
        stockNumber: 2
    },
    3: {
        color: 'white',
        manufacturerName: 'BMW',
        mileage: { number: 20 },
        stockNumber: 3
    }
};

const createStorage = () => ({
    getItem: jest.fn().mockReturnValue(JSON.stringify(favourites)),
    setItem: jest.fn()
});

describe('Get Favourite Saga', () => {
    const _originLocalStorage = window.localStorage
    
    beforeEach(() => {
        delete window.localStorage;

        window.localStorage = createStorage()
    });

    afterEach(() => {
        window.localStorage = _originLocalStorage;
    });

    describe('Should filter by color', () => {
        const payload = { color: 'white' };
        const saga = getFavourite({ payload });
        let action;

        it('1) should get items from localStorage', () => {
            action = saga.next().value;
            expect(localStorage.getItem).toHaveBeenCalled()
        });

        it('2) should update Favourite with filtered items', () => {
            expect(action).toEqual(put(updateFavourite({
                items: [favourites[1], favourites[3]],
                ...payload
            })));
        });
    });

    describe('Should filter by manufacturer', () => {
        const payload = { manufacturer: 'Audi' };
        const saga = getFavourite({ payload });
        let action;

        it('1) should get items from localStorage', () => {
            action = saga.next().value;
            expect(localStorage.getItem).toHaveBeenCalled()
        });

        it('2) should update Favourite with filtered items', () => {
            expect(action).toEqual(put(updateFavourite({
                items: [favourites[1], favourites[2]],
                ...payload
            })));
        });
    });

    describe('Should sort by ASC', () => {
        const payload = { sort: 'asc' };
        const saga = getFavourite({ payload });
        let action;

        it('1) should get items from localStorage', () => {
            action = saga.next().value;
            expect(localStorage.getItem).toHaveBeenCalled()
        });

        it('2) should update Favourite with filtered items', () => {
            expect(action).toEqual(put(updateFavourite({
                items: [favourites[2], favourites[3], favourites[1]],
                ...payload
            })));
        });
    });

    describe('Should sort by DES', () => {
        const payload = { sort: 'des' };
        const saga = getFavourite({ payload });
        let action;

        it('1) should get items from localStorage', () => {
            action = saga.next().value;
            expect(localStorage.getItem).toHaveBeenCalled()
        });

        it('2) should update Favourite with filtered items', () => {
            expect(action).toEqual(put(updateFavourite({
                items: [favourites[1], favourites[3], favourites[2]],
                ...payload
            })));
        });
    });
});

describe('Add Favourite Saga', () => {
    const _originLocalStorage = window.localStorage
    
    beforeAll(() => {
        delete window.localStorage;

        window.localStorage = createStorage()
    });

    afterAll(() => {
        window.localStorage = _originLocalStorage;
    });

    const id = 4;
    const car = { id: 4, name: 'car' };
    const items = [favourites[1], favourites[2], favourites[3]]
    const state = { entities: { cars: { 4: car } }, favourites: { items } };
    const saga = addFavourite({ payload: id });
    let action;

    it('1) Select state', () => {
        expect(saga.next().value).toEqual(select());
    });

    it('2) Should set item to LocalStorage', () => {
        action = saga.next(state).value;

        expect(localStorage.setItem).toHaveBeenCalled()
        expect(localStorage.setItem).toHaveBeenCalledWith(FAVOURITE_KEY, JSON.stringify({
            ...favourites,
            ...{ 4: car }
        }));
    });

    it('3) Should update Favourite with new item', () => {
        expect(action).toEqual(put(updateFavourite({
            items: [car, ...items]
        })));
    });
});

describe('Remove Favourite Saga', () => {
    const _originLocalStorage = window.localStorage
    
    beforeAll(() => {
        delete window.localStorage;

        window.localStorage = createStorage()
    });

    afterAll(() => {
        window.localStorage = _originLocalStorage;
    });

    const payload = 1;
    const items = [favourites[1], favourites[2], favourites[3]];
    const state = { favourites: { items } };
    const saga = removeFavourite({ payload });
    let action;

    it('1) Select state', () => {
        delete favourites[payload];
        expect(saga.next().value).toEqual(select());
    });

    it('2) Should remove item to LocalStorage', () => {
        action = saga.next(state).value;
        expect(localStorage.setItem).toHaveBeenCalled()
        expect(localStorage.setItem).toHaveBeenCalledWith(FAVOURITE_KEY, JSON.stringify(favourites));
    });

    it('3) Should update Favourite with new items', () => {
        expect(action).toEqual(put(updateFavourite({
            items: [favourites[2], favourites[3]]
        })));
    });
});
