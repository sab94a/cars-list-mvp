import cars from 'reducers/cars';
import car from 'reducers/car';
import colors from 'reducers/colors';
import manufacturers from 'reducers/manufacturer';
import entities from 'reducers/entities';
import favourites from 'reducers/favourites';

import reducer from './';

describe('Root Reducer =>', () => {
    const state = reducer(undefined, {});

    it('Should have correct Cars State', () => {
        expect(state.cars).toEqual(cars(undefined, {}));
    });

    it('Should have correct Entities State', () => {
        expect(state.entities).toEqual(entities(undefined, {}));
    });

    it('Should have correct Car State', () => {
        expect(state.car).toEqual(car(undefined, {}));
    });
    
    it('Should have correct Colors State', () => {
        expect(state.colors).toEqual(colors(undefined, {}));
    });

    it('Should have correct Manufacturers State', () => {
        expect(state.manufacturers).toEqual(manufacturers(undefined, {}));
    });
    it('Should have correct Favourites State', () => {
        expect(state.favourites).toEqual(favourites(undefined, {}));
    });
});
