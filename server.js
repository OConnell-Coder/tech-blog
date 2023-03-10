const express = require('express');
// const routes = require('./controllers');

const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "supersecretsecret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  },
  reSave: false,
  saveUnInitialized: true,
  store: new SequelizeStore({db: sequelize})
};

app.use(session(sess));
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
