import {
    GET_COLORS_REQUEST,
    GET_COLORS_SUCCESS,
    GET_COLORS_ERROR
} from 'constants/actions';

import colorsReducer, { defaultState } from './';

describe('Colors Reducer', () => {
    it('Should return correct default state', () => {
        const state = colorsReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept GET_COLORS_REQUEST action', () => {
        const state = colorsReducer(defaultState, { type: GET_COLORS_REQUEST });
        
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('Should accept GET_COLORS_SUCCESS action', () => {
        const previous = {
            loading: true,
            error: null,
            items: ['white', 'red']
        }
        const payload = ['black', 'green'];

        const state = colorsReducer(previous, { type: GET_COLORS_SUCCESS, payload });
        
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
        expect(state.items).toEqual(payload);
    });

    it('Should accept GET_COLORS_ERROR action', () => {
        const previous = {
            loading: true,
            error: null,
            items: ['white', 'red']
        };
        const payload = 'error';
        const state = colorsReducer(previous, { type: GET_COLORS_ERROR, payload });

        expect(state.loading).toBe(false);
        expect(state.error).toBe(payload);
        expect(state.items).toEqual(previous.items);
    });
});
