import { 
    INIT_CAR,
    INIT_CARS,
    INIT_FAVOURITIES,
    GET_CARS, 
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR,
    GET_CAR,
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR,
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_ERROR,
    GET_MANUFACTURERS_REQUEST,
    GET_MANUFACTURERS_SUCCESS,
    GET_MANUFACTURERS_ERROR,
    CLEAR_CARS_PAGES, 
    SET_CARS_FILTER, 
    SET_CARS_PAGE,
    ENTITIES,
    API_REQUEST,
    GET_FAVOURITE,
    ADD_FAVOURITE,
    REMOVE_FAVOURITE,
    UPDATE_FAVOURITE
} from 'constants/actions';

import { API_CARS, API_COLORS, API_MANUFACTURERS } from 'constants/api';

import { Car } from '../entities';

import {
    initCar,
    getCar,
    initCars,
    getCars,
    setCarsFilters,
    setCarsPage,
    clearCarsPages,
    initFavourities,
    getFavourite,
    addFavourite,
    removeFavourite,
    updateFavourite,
    fetchCars,
    fetchCar,
    fetchColors,
    fetchManufacturers
} from './';

describe('Actions =>', () => {
    describe('initCar', () => {
        it('return correct action', () => {
            const id = 12321;
            const action = initCar(id);

            expect(action.type).toBe(INIT_CAR);
            expect(action.payload).toEqual(id);
        })
    });

    describe('getCar', () => {
        it('return correct action', () => {
            const params = { page: 3, color: 'black' };
            const action = getCar(params);

            expect(action.type).toBe(GET_CAR);
            expect(action.payload).toEqual(params);
        })
    });

    describe('initCars', () => {
        it('return correct action', () => {
            const id = 12321;
            const action = initCars(id);

            expect(action.type).toBe(INIT_CARS);
            expect(action.payload).toEqual(id);
        })
    });

    describe('getCars', () => {
        it('return correct action', () => {
            const params = [1, 2, 3];
            const action = getCars(params);

            expect(action.type).toBe(GET_CARS);
            expect(action.payload).toEqual(params);
        })
    });

    describe('setCarsFilters', () => {
        it('return correct action', () => {
            const filter = { sort: 1 };
            const action = setCarsFilters(filter);

            expect(action.type).toBe(SET_CARS_FILTER);
            expect(action.payload).toEqual(filter);
        })
    });

    describe('setCarsPage', () => {
        it('return correct action', () => {
            const page = 111;
            const action = setCarsPage(page);

            expect(action.type).toBe(SET_CARS_PAGE);
            expect(action.payload).toBe(page);
        })
    });

    describe('clearCarsPages', () => {
        it('return correct action', () => {
            const action = clearCarsPages();

            expect(action.type).toBe(CLEAR_CARS_PAGES);
        })
    });

    describe('initFavourities', () => {
        it('return correct action', () => {
            const params = { color: 'white' }
            const action = initFavourities(params);

            expect(action.type).toBe(INIT_FAVOURITIES);
            expect(action.payload).toBe(params);
        })
    });

    describe('getFavourite', () => {
        it('return correct action', () => {
            const params = { color: 'white' }
            const action = getFavourite(params);

            expect(action.type).toBe(GET_FAVOURITE);
            expect(action.payload).toBe(params);
        })
    });

    describe('addFavourite', () => {
        it('return correct action', () => {
            const id = 123
            const action = addFavourite(id);

            expect(action.type).toBe(ADD_FAVOURITE);
            expect(action.payload).toBe(id);
        })
    });

    describe('removeFavourite', () => {
        it('return correct action', () => {
            const id = 123
            const action = removeFavourite(id);

            expect(action.type).toBe(REMOVE_FAVOURITE);
            expect(action.payload).toBe(id);
        })
    });

    describe('updateFavourite', () => {
        it('return correct action', () => {
            const payload = { color: 'black', items: [{ id: 1, car: 'Car' }]}
            const action = updateFavourite(payload);

            expect(action.type).toBe(UPDATE_FAVOURITE);
            expect(action.payload).toBe(payload);
        })
    });

    describe('fetchCars', () => {
        const params = {
            page: 1, 
            manufacturer: 'BMW', 
            color: 'white', 
            sort: 'des'
        };
        const action = fetchCars(params);

        it('should have correct Action Type', () => {
            expect(action.type).toBe(API_REQUEST);
        });

        it('should have correct actions type on start, end and error request', () => {
            expect(action.types).toEqual([GET_CARS_REQUEST, ENTITIES, GET_CARS_ERROR]);
        });

        it('should have correct endpoint for fetch data from api', () => {
            expect(action.endpoint).toBe(API_CARS);
        });

        it('should have correct query for request', () => {
            expect(action.query).toEqual(params);
        });

        it('should generate correct payload for update entities action from server response', () => {
            const res = {
                totalPageCount: 100,
                totalCarsCount: 10,
                cars: [1, 2, 3]
            };
            const entityUpdateAction = action.onSuccess(res);

            expect(entityUpdateAction.action).toBe(GET_CARS_SUCCESS);
            expect(entityUpdateAction.schema).toEqual({ items: [Car] });
            expect(entityUpdateAction.data).toEqual({
                items: res.cars,
                page: params.page,
                totalPages: res.totalPageCount,
                totalItems: res.totalCarsCount
            });
        });
    });

    describe('fetchCar', () => {
        const id = 1298
        const action = fetchCar(id);

        it('should have correct Action Type', () => {
            expect(action.type).toBe(API_REQUEST);
        });

        it('should have correct actions type on start, end and error request', () => {
            expect(action.types).toEqual([GET_CAR_REQUEST, ENTITIES, GET_CAR_ERROR]);
        });

        it('should have correct endpoint for fetch data from api', () => {
            expect(action.endpoint).toBe(`${API_CARS}/${id}`);
        });

        it('should generate correct payload for update entities action from server response', () => {
            const res = { car: { model: 'Model', stockNumber: 73952 } };
            const entityUpdateAction = action.onSuccess(res);

            expect(entityUpdateAction.action).toBe(GET_CAR_SUCCESS);
            expect(entityUpdateAction.schema).toEqual(Car);
            expect(entityUpdateAction.data).toEqual(res.car);
        });
    });

    describe('fetchColors', () => {
        const action = fetchColors();

        it('should have correct Action Type', () => {
            expect(action.type).toBe(API_REQUEST);
        });

        it('should have correct actions type on start, end and error request', () => {
            expect(action.types).toEqual([GET_COLORS_REQUEST, GET_COLORS_SUCCESS, GET_COLORS_ERROR]);
        });

        it('should have correct endpoint for fetch data from api', () => {
            expect(action.endpoint).toBe(API_COLORS);
        });

        it('should generate correct payload for success', () => {
            const res = { colors: ['white', 'black' ] };
            const payload = action.onSuccess(res);

            expect(payload).toBe(res.colors);
        });
    });

    describe('fetchManufacturers', () => {
        const action = fetchManufacturers();

        it('should have correct Action Type', () => {
            expect(action.type).toBe(API_REQUEST);
        });

        it('should have correct actions type on start, end and error request', () => {
            expect(action.types).toEqual([GET_MANUFACTURERS_REQUEST, GET_MANUFACTURERS_SUCCESS, GET_MANUFACTURERS_ERROR]);
        });

        it('should have correct endpoint for fetch data from api', () => {
            expect(action.endpoint).toBe(API_MANUFACTURERS);
        });

        it('should generate correct payload for success', () => {
            const res = { manufacturers: ['BMW', 'OTHER BMW' ] };
            const payload = action.onSuccess(res);

            expect(payload).toBe(res.manufacturers);
        });
    });
});
