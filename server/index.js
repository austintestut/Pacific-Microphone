/* eslint-disable no-console */
const express = require('express');
require('dotenv').config();
const db = require('../database/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Ahoy Matey's");
});

app.listen(port, () => {
  console.log(`We're sailing away from port ${port}`);
});
