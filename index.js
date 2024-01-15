const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const initRoute = require('./src/routes');
const mysql = require('mysql2');

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(
  express.urlencoded({
    limit: '30mb',
    extended: true,
  })
);
app.use(
  express.json({
    limit: '30mb',
    extended: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

initRoute(app);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })



