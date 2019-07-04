import {
    GET_MANUFACTURERS_REQUEST,
    GET_MANUFACTURERS_SUCCESS,
    GET_MANUFACTURERS_ERROR
} from 'constants/actions';

import manufacturerReducer, { defaultState } from './';

describe('ManufacturerReducer Reducer', () => {
    it('Should return correct default state', () => {
        const state = manufacturerReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept GET_MANUFACTURERS_REQUEST action', () => {
        const state = manufacturerReducer(defaultState, { type: GET_MANUFACTURERS_REQUEST });
        
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_MANUFACTURERS_SUCCESS action', () => {
        const previous = {
            loading: true,
            error: null,
            items: ['BMW', 'Audi']
        }
        const payload = ['Mercedes-Benz'];

        const state = manufacturerReducer(previous, { type: GET_MANUFACTURERS_SUCCESS, payload });
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
        expect(state.items).toEqual(payload);
    });

    it('Should accept GET_MANUFACTURERS_ERROR action', () => {
        const previous = {
            loading: true,
            error: null,
            items: ['Mercedes-Benz']
        };
        const payload = 'error';
        const state = manufacturerReducer(previous, { type: GET_MANUFACTURERS_ERROR, payload });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(payload);
        expect(state.items).toEqual(previous.items);
    });
});
