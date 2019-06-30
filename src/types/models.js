// @flow

export type Color = 'string'

export type MileageUnit = 'km' | 'mi'

export type Mileage = {
    number: number,
    unit: MileageUnit
}

export type Fuel = 'Diesel' | 'Petrol'

export type Car = {
    stockNumber: number,
    manufacturerName: string,
    modelName: string,
    mileage: Mileage,
    fuelType: Fuel,
    color: Color,
    pictureUrl: string
}

export type Model = {
    name: string
}

export type Manufacturer = {
    name: string,
    models: Array<Model>
}
