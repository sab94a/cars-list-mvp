import { put, select, takeEvery, fork } from "@redux-saga/core/effects";
import { fetchColors, fetchManufacturers, getCars, getCar, getFavourite } from 'actions';
import { INIT_CAR, INIT_CARS, INIT_FAVOURITIES } from 'constants/actions';

import initSaga, { initCarsSaga, initCarSaga, initFavourites, initFilters } from './init';

describe('Root Init Saga', () => {
    const saga = initSaga();

    it('Should add INIT_CARS listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(INIT_CARS, initCarsSaga));
    });

    it('Should add INIT_CAR listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(INIT_CAR, initCarSaga));
    });

    it('Should add INIT_FAVOURITIES listenner', () => {
        expect(saga.next().value).toEqual(takeEvery(INIT_FAVOURITIES, initFavourites));
    });
});

describe('Init Filters Saga', () => {
    describe('If colors are absent:', () => {
        const state = { colors: { items: [] }, manufacturers: { items: [ 'test' ] } };
        const saga = initFilters();

        it('1) Should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('1) Should fetch colors', () => {
            const next = saga.next(state).value;
            const action = fetchColors();

            expect(next.type).toEqual('PUT');
            expect(next.payload.action.type).toEqual(action.type);
            expect(next.payload.action.endpoint).toEqual(action.endpoint);
            expect(next.payload.action.types).toEqual(action.types);
        });
    });

    describe('If Manufacturers are absent:', () => {
        const state = { colors: { items: [ 'test' ] }, manufacturers: { items: [] } };
        const saga = initFilters();

        it('1) Should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('1) Should fetch manufacturers', () => {
            const next = saga.next(state).value;
            const action = fetchManufacturers();

            expect(next.type).toEqual('PUT');
            expect(next.payload.action.type).toEqual(action.type);
            expect(next.payload.action.endpoint).toEqual(action.endpoint);
            expect(next.payload.action.types).toEqual(action.types);
        });
    });
});


describe('Init Favourites Saga', () => {
    describe('If favourites are absent:', () => {
        const payload = { color: 'red', manufacturer: 'Audi' }
        const state = { favourites: [] };
        const saga = initFavourites({ payload });

        it('1) Should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) Should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });

        it('3) Should getFavourites', () => {
            expect(saga.next().value).toEqual(put(getFavourite(payload)));
        });
    });

    describe('If favourites are exists:', () => {
        const payload = { color: 'red', manufacturer: 'Audi' }
        const state = { favourites: [ 'test' ] };
        const saga = initFavourites({ payload });

        it('1) Should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) Should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });
    });
});

describe('Init Car Saga', () => {
    describe('If favourites are absent:', () => {
        const payload = 34;
        const state = { favourites: [] };
        const saga = initCarSaga({ payload });

        it('1) Should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) Should get favourites', () => {
            expect(saga.next(state).value).toEqual(put(getFavourite()));
        });

        it('3) Should get car', () => {
            expect(saga.next().value).toEqual(put(getCar(payload)));
        })
    });

    describe('If favourites are exist:', () => {
        const payload = 34;
        const state = { favourites: ['test'] };
        const saga = initCarSaga({ payload });

        it('1) should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) Should get car', () => {
            expect(saga.next(state).value).toEqual(put(getCar(payload)));
        })
    })
});

describe('Init Cars Saga', () => {
    describe('If favourites are absent:', () => {
        const payload = { page: 1 };
        const state = { 
            cars: { pages: { 1: { id: 1 } } }, 
            favourites: [] 
        };
        const saga = initCarsSaga({ payload });

        it('1) should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });

        it('3) should get favourites', () => {
            expect(saga.next().value).toEqual(put(getFavourite()));
        });
    });

    describe('If cars are absent:', () => {
        const payload = { page: 1 };
        const state = { 
            cars: { pages: {} }, 
            favourites: ['test']
        };
        const saga = initCarsSaga({ payload });

        it('1) should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });

        it('3) should get cars', () => {
            expect(saga.next().value).toEqual(put(getCars(payload)));
        });
    });

    describe('If cars and favourites are absent:', () => {
        const payload = { page: 1 };
        const state = { 
            cars: { pages: {} }, 
            favourites: [] 
        };
        const saga = initCarsSaga({ payload });

        it('1) should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });

        it('3) should get favourites', () => {
            expect(saga.next().value).toEqual(put(getFavourite()));
        });

        it('4) should get cars', () => {
            expect(saga.next().value).toEqual(put(getCars(payload)));
        });
    });

    describe('If cars and favourites are exist:', () => {
        const payload = { page: 1 };
        const state = { 
            cars: { pages: { 1: { id: 1 } } }, 
            favourites: ['test'] 
        };
        const saga = initCarsSaga({ payload });

        it('1) should select state', () => {
            expect(saga.next().value).toEqual(select());
        });

        it('2) should init filters', () => {
            expect(saga.next(state).value).toEqual(fork(initFilters));
        });
    })
});
