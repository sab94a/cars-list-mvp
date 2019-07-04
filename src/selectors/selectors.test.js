import {
    selectCarsLoading,
    selectNavigation,
    selectCars,
    selectColors,
    selectManufacturers,
    selectFilters,
    selectCar,
    selectCarError,
    selectFavourites,
    selectFavouriteFilters
} from './';

import * as helpers from 'helpers';

helpers.getCarInfo = jest.fn();
helpers.getCarInfo.mockImplementation(({ stockNumber, modelName }) => ({
    id: stockNumber,
    name: modelName
}))
 
const cars = [{
    stockNumber: 1,
    manufacturerName: 'Audi',
    modelName: 'A3',
    mileage: {
        number: 100
    },
    fuelType: 'Disel',
    color: 'red',
    pictureUrl: 'image_1.png'
}, {
    stockNumber: 2,
    manufacturerName: 'BMW',
    modelName: 'X5',
    mileage: {
        number: 400
    },
    fuelType: 'Disel',
    color: 'green',
    pictureUrl: 'image_2.png'
}];

const state = {
    cars: {
        pages: {
            3: [1, 2]
        },
        manufacturer: '',
        sort: 'asd',
        color: 'white',
        loading: true,
        totalPages: 3,
        totalItems: 22,
        page: 3
    },
    entities: {
        cars: {
            1: cars[0],
            2: cars[1]
        }
    },
    favourites: {
        items: [cars[1]],
        sort: '',
        manufacturer: '',
        color: 'red'
    },
    colors: {
        items: ['black', 'white']
    },
    car: {
        item: 2,
        error: 'error'
    },
    manufacturers: {
        items: [{
            name: 'Audi'
        }, {
            name: 'BMW'
        }]
    }
};

describe('Selectors:', () => {
    describe('selectCarsLoading =>', () => {
        it('Should return correct value', () => {
            expect(selectCarsLoading(state)).toBe(state.cars.loading);
        })
    });

    describe('selectNavigation =>', () => {
        it('Should return correct value', () => {
            expect(selectNavigation(state)).toEqual({
                shownItems: 22,
                totalItems: 22,
                totalPages: 3,
                page: 3
            });
        })
    });

    describe('selectCars =>', () => {
        it('Should return correct value', () => {
            expect(selectCars(state)).toEqual([{
                id: cars[0].stockNumber,
                name: cars[0].modelName
            }, {
                id: cars[1].stockNumber,
                name: cars[1].modelName
            }])
        });
    });

    describe('selectColors =>', () => {
        it('Should return correct value', () => {
            expect(selectColors(state)).toEqual([{
                title: 'black',
                value: 'black'
            }, {
                title: 'white',
                value: 'white'
            }])
        });
    });

    describe('selectManufacturers =>', () => {
        it('Should return correct value', () => {
            expect(selectManufacturers(state)).toEqual([{
                title: 'Audi',
                value: 'Audi'
            }, {
                title: 'BMW',
                value: 'BMW'
            }])
        });
    });

    describe('selectFilters =>', () => {
        it('Should return correct value', () => {
            expect(selectFilters(state)).toEqual({
                color: state.cars.color,
                sort: state.cars.sort,
                manufacturer: state.cars.manufacturer
            });
        });
    });

    describe('selectCar =>', () => {
        it('Should return correct value', () => {
            expect(selectCar(state, { match: { params: { id: 2 } } })).toEqual({
                id: cars[1].stockNumber,
                name: cars[1].modelName
            });
        });

        it('Should return null if id is incorrect', () => {
            expect(selectCar(state, { match: { params: { id: 12 } } })).toEqual(null);
        });
    });

    describe('selectCarError =>', () => {
        it('Should return correct value', () => {
            expect(selectCarError(state)).toEqual(state.car.error);
        });
    });

    describe('selectFavourites =>', () => {
        it('Should return correct value', () => {
            expect(selectFavourites(state)).toEqual([{
                id: cars[1].stockNumber,
                name: cars[1].modelName
            }]);
        });
    });

    describe('selectFavouriteFilters=>', () => {
        it('Should return correct value', () => {
            expect(selectFavouriteFilters(state)).toEqual({
                color: state.favourites.color,
                sort: state.favourites.sort,
                manufacturer: state.favourites.manufacturer
            });
        });
    });
});
