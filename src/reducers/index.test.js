import car from './cars';
import entities from 'reducers/entities';
import reducer from './';

describe('Root Reducer =>', () => {
    const state = reducer(undefined, {});

    it('Should have correct Cars State', () => {
        expect(state.cars).toEqual(car(undefined, {}));
    });

    it('Should have correct Entities State', () => {
        expect(state.entities).toEqual(entities(undefined, {}));
    });
});
