const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const routes = require('./routes');
const db = require('./db');

const PORT = process.env.PORT || 8000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(express.static('public'));

db.initDatabase().then(() => {
  routes.initRoutes(app);

  app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
