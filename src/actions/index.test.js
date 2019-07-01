import { 
    GET_CARS, 
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    GET_CARS_ERROR,
    CLEAR_CARS_PAGES, 
    SET_CARS_FILTER, 
    SET_CARS_PAGE,
    ENTITIES,
    API_REQUEST
} from 'constants/actions';

import { API_CARS } from 'constants/api';

import { Car } from '../entities';

import { 
    getCars,
    setCarsFilters,
    setCarsPage,
    clearCarsPages,
    fetchCars
} from './';

describe('Actions =>', () => {
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
            expect(action.endpoint).toBe(API_CARS)
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
});
