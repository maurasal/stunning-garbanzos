//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const hbs = exphbs.create({});
const routes = require("./Controllers");
const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Server is listening on: http://localhost:" + PORT);
});
