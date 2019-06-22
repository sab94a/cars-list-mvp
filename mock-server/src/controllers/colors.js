const colors = require("../data/colors");

function getColors(req, res) {
  res.json({ colors });
}

module.exports = { getColors };
