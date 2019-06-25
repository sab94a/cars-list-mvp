import {
    GET_CAR_REUQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR
} from 'constants/actions';

import carReducer, { defaultState } from './';

describe('CarReducer => ', () => {
    it('Should return correct default state', () => {
        const state = carReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept GET_CAR_REUQUEST action', () => {
        const state = carReducer(defaultState, { type: GET_CAR_REUQUEST });

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_CAR_SUCCESS action', () => {
        const payload = [1, 2, 3];
        const state = carReducer(defaultState, { type: GET_CAR_SUCCESS, payload });

        expect(state.items).toEqual(payload);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_CAR_ERROR action', () => {
        const payload = 'error';
        const state = carReducer(defaultState, { type: GET_CAR_ERROR, payload });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(payload);
    });
});
