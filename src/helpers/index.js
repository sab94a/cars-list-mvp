//@flow

import { generatePath } from "react-router";
import { RoutesMap } from 'config';
import type { Car } from 'types/models';
import type { CarView } from 'types/views';

export const uppercaseFirstLetter = (str:string):string => 
    str.charAt(0).toUpperCase() + str.slice(1);

export const getCarInfo = ({
    stockNumber, 
    manufacturerName,
    modelName,
    mileage: {
        number,
        unit
    },
    fuelType,
    pictureUrl,
    color
}:Car, favourites:Array<Car>):CarView => ({
    stockNumber,
    title: `${ manufacturerName } ${ modelName }`,
    image: pictureUrl,
    link: generatePath(RoutesMap.Car.path, { id: stockNumber }),
    description: `Stock # ${ stockNumber } - ${ number } ${unit.toUpperCase()} - ${ fuelType } - ${ uppercaseFirstLetter(color) }`,
    isFavourite: favourites.some(item => item.stockNumber === stockNumber)
});
