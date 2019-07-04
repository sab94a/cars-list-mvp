import {
    GET_CAR_REQUEST,
    GET_CAR_SUCCESS,
    GET_CAR_ERROR
} from 'constants/actions';

import carReducer, { defaultState } from './';

describe('Car Reducer', () => {
    it('Should return correct default state', () => {
        const state = carReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept GET_CAR_REQUEST action', () => {
        const state = carReducer(defaultState, { type: GET_CAR_REQUEST });
        
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_CAR_SUCCESS action', () => {
        const previous = {
            loading: true,
            error: null,
            item: {
                stockNumber: 123,
                name: 'Car'
            }
        }
        const payload = { stockNumber: 999 };

        const state = carReducer(previous, { type: GET_CAR_SUCCESS, payload });
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
        expect(state.item).toEqual(payload);
    });

    it('Should accept GET_CAR_ERROR action', () => {
        const previous = {
            loading: true,
            error: null,
            item: {
                stockNumber: 123,
                name: 'Car'
            }
        };
        const payload = 'error';
        const state = carReducer(previous, { type: GET_CAR_ERROR, payload });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(payload);
        expect(state.item).toEqual(previous.item);
    });
});
