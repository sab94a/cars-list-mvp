/**
 * 
 * @param {Array} collection 
 * @param {Number} itemsPerPage 
 * @param {Number} page 
 */
function paginate(collection = [], itemsPerPage = 10, page = 1) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return collection.slice(start, end);
}

module.exports = paginate;
