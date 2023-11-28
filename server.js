// Import necessary modules and packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connections'); // Adjust the path based on your project structure
const routes = require('./routes');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

// Set up Handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for handling POST data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Set up session handling
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
// Routes
app.use(routes);
// Set up Sequelize to sync with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

