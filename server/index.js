"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const OIERoutes = require("./routes/word-counter");

const routeInitialText = "/cor-project/v1";

const app = express();
app.use(bodyParser.json());

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Initialize app routes
app.use(`${routeInitialText}/word-counter`, OIERoutes);

const PORT = process.env.PORT || 3007;

/**
 * Init app and DB
 */
const init = async () => {
  if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`COR Project running in port: ${PORT}`));
  }
};

init();

module.exports = {
  app,
  routeInitialText,
  init,
};
