import { uppercaseFirstLetter, getCarInfo } from './';

describe('Helpers:', () => {
    describe('uppercaseFirstLetter =>', () => {
        it('Should work correctly', () => {
            expect(uppercaseFirstLetter('word')).toBe('Word');
        });
    });

    describe('getCarInfo =>', () => {
        it('Should work correctly', () => {
            const car = {
                stockNumber: 1, 
                manufacturerName: 'BMW',
                modelName: '123',
                mileage: {
                    number: 1212,
                    unit: 'km'
                },
                fuelType: 'disel',
                pictureUrl: 'picture',
                color: 'white'
            };
            const carInfo = getCarInfo(car);

            expect(carInfo.stockNumber).toBe(1);
            expect(carInfo.title).toBe('BMW 123');
            expect(carInfo.image).toBe('picture');
            expect(carInfo.link).toBe('/car/1/');
            expect(carInfo.description).toBe('Stock # 1 - 1212 KM - disel - White');
        });
    });
});
