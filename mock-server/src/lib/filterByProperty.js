/**
 * 
 * @param {String} propertyName 
 * @param {*} propertyValue 
 * @param {Array} collection 
 */
function filterByProperty(propertyName, propertyValue, collection) {
  if (propertyValue) {
    return collection.filter(function(item) {
      return item[propertyName].toLowerCase() === propertyValue.toLowerCase();
    });
  }

  return collection;
}

module.exports = filterByProperty;
