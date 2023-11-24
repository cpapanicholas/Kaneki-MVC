const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

// Import your models as needed
const { User } = require('../models');

// View user profile (requires authentication)
router.get('/profile', isAuthenticated, (req, res) => {
  // Render the user profile page with user details
  res.render('profile', { user: req.session.user });
});

// Add more user routes (update profile, change password) as needed

module.exports = router;