const mongoose = require("mongoose");
const config = require("config");   
const debug = require("debug")("app:startup");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function() {
    debug("Server Connected");
  })
  .catch(function(err) {
    debug(err);
  });