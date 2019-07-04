import { UPDATE_FAVOURITE } from 'constants/actions';

import favouritesReducer, { defaultState } from './';

describe('Favourites Reducer', () => {
    it('Should return correct default state', () => {
        const state = favouritesReducer(undefined, {});

        expect(state).toEqual(defaultState);
    });

    it('Should accept UPDATE_FAVOURITE action', () => {
        const previous = {
            items: [{ stockNumber: 8787 }],
            color: 'black',
            manufacturer: null,
            sort: 'asd'
        };
        const payload = {
            items: [{ stockNumber: 544 }],
            manufacturer: 'BMW'
        }
        const state = favouritesReducer(previous, { type: UPDATE_FAVOURITE, payload });
        
        expect(state.items).toBe(payload.items);
        expect(state.color).toBe(previous.color);
        expect(state.manufacturer).toBe(payload.manufacturer);
        expect(state.sort).toBe(previous.sort);
    });
});
