import car from './cars';
import reducer from './';

describe('Root Reducer =>', () => {
    const state = reducer(undefined, {});

    it('Should have correct Cars State', () => {
        expect(state.cars).toEqual(car(undefined, {}));
    });
})