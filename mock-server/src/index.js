const express = require("express");
const cors = require('cors');
const routes = require("./routes");

const app = express();
const port = 3001;

app.use(express.static(__dirname + "/public"));
app.use(cors());

routes(app);

app.listen(port, function() {
  console.log(`App listening on port ${port}!`);
});
