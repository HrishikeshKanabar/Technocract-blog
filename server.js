const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
