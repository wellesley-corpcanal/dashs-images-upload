require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors'); // 1. Import the cors package
const routes = require('./routes');

const app = express();

app.use(cors()); // 2. Add the cors middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}`);
});