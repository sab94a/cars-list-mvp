/**
 * 
 * @param {Number} max 
 */
function getRandomNumber(max) {
  return Math.round(Math.random() * max)
}

/**
 * @param {Array} collection 
 */
function getRandomItemFromCollection(collection) {
  const max = collection.length - 1;
  const index = getRandomNumber(max);

  return collection[index];
}

module.exports = {
  getRandomNumber,
  getRandomItemFromCollection,
};
