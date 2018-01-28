const express = require('express');
const app = express();

const routes = require('./routes');
const db = require('./db');

const PORT = process.env.PORT || 3000;

// init bodyParsers
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

db.initDatabase().then(() => {
  routes.initRoutes(app);

  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
