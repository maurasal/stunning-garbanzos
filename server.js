//Dependencies
const express = require('express');
const session = require('express-session')
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const routes = require('./Controllers');

// Sets up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//     secret: 'Super secret secret',
//     cookie: {},
//     resave: false,
//     saveUninitialized: true,
//     store: new SequelizeStore({
//       db: sequelize
//     })
// };

// app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(require('./Controllers/users'));
app.use(routes);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
})
