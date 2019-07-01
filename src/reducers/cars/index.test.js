import {
    GET_CARS_REQUEST,
    GET_CARS_SUCCESS,
    CLEAR_CARS_PAGES,
    GET_CARS_ERROR
} from 'constants/actions';

import carReducer, { defaultState } from './';

describe('CarReducer => ', () => {
    it('Should return correct default state', () => {
        const state = carReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept GET_CARS_REQUEST action', () => {
        const state = carReducer(defaultState, { type: GET_CARS_REQUEST });

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_CARS_SUCCESS action', () => {
        const items = [1, 2, 3];
        const payload = {
            items,
            page: 1,
            totalPages: 100,
            totalItems: 120
        }
        const prevState = {
            ...defaultState,
            pages: {
                10: [1, 2]
            }
        }
        const state = carReducer(prevState, { type: GET_CARS_SUCCESS, payload });

        expect(state.pages[payload.page]).toEqual(items);
        expect(state.pages[10]).toEqual(prevState.pages[10]);
        expect(state.page).toEqual(payload.page);
        expect(state.totalPages).toEqual(payload.totalPages);
        expect(state.totalItems).toEqual(payload.totalItems);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('Should accept CLEAR_CARS_PAGES action', () => {
        const prevState = {
            ...defaultState,
            pages: {
                10: [1, 2]
            }
        }
        const state = carReducer(prevState, { type: CLEAR_CARS_PAGES });

        expect(Object.keys(state.pages)).toHaveLength(0);
    })

    it('Should accept GET_CARS_ERROR action', () => {
        const payload = 'error';
        const state = carReducer(defaultState, { type: GET_CARS_ERROR, payload });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(payload);
    });
});
