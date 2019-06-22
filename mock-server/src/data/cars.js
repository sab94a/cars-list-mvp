const Random = require("../lib/random");

const colors = require("./colors");
const manufacturers = require("./manufacturers");

const cars = [];

for (var i = 0; i < 1000; i++) {
  const stockNumber = Random.getRandomNumber(89999) + 10000;
  const manufacturer = Random.getRandomItemFromCollection(manufacturers);
  const model = Random.getRandomItemFromCollection(manufacturer.models);
  const color = Random.getRandomItemFromCollection(colors);
  const mileageNumber = Random.getRandomNumber(99999) + 100000;
  const fuelType = Random.getRandomItemFromCollection(["Petrol", "Diesel"]);

  cars.push({
    stockNumber,
    manufacturerName: manufacturer.name,
    modelName: model.name,
    color,
    mileage: {
      number: mileageNumber,
      unit: 'km',
    },
    fuelType,
    pictureUrl: "http://localhost:3001/car.svg"
  });
}

module.exports = cars;
