const { User } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
  // Render the login form
  renderLoginForm(req, res) {
    res.render('login');
  },

  // Handle user login
  async loginUser(req, res) {
    try {
      // Extract username and password from the request body
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ where: { username } });

      // If the user is not found or the password is incorrect, render an error
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      // Set the user in the session
      req.session.user = { id: user.id, username: user.username };

      // Redirect to the user's dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Render the signup form
  renderSignupForm(req, res) {
    res.render('signup');
  },

  // Handle user signup
  async signupUser(req, res) {
    try {
      // Extract username and password from the request body
      const { username, password } = req.body;

      // Hash the password before storing it
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Create a new user
      const newUser = await User.create({ username, password: hashedPassword });

      // Set the user in the session
      req.session.user = { id: newUser.id, username: newUser.username };

      // Redirect to the user's dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Handle user logout
  logoutUser(req, res) {
    // Destroy the session to log the user out
    req.session.destroy(() => {
      res.redirect('/');
    });
  },

  // Render user profile (you can customize this based on your requirements)
  renderUserProfile(req, res) {
    res.render('user-profile', { user: req.session.user });
  },
};

module.exports = userController;