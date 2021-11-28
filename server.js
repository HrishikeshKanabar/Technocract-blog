const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
// import sequelize connection
const seq = require('./config/connection');
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(routes);
app.use(session(sess));

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true });

app.listen(PORT, () => {
  console.log('App listening on port ${PORT}!');
});