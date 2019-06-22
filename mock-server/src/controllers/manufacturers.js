const manufacturers = require("../data/manufacturers");

function getManufacturers(req, res) {
  res.json({ manufacturers });
}

module.exports = { getManufacturers };
