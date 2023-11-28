const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// Import your models as needed
const { Post, User, Comment } = require('../../models');
const isAuthenticated = require('../../config/middleware/isAuthenticated');

// User signup
router.post('/signup', async (req, res) => {
  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });

    // Set the user in the session
    req.session.user = {
      id: newUser.id,
      username: newUser.username,
    };

    // Redirect to the dashboard or any other desired page
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
// router.post('/login', async (req, res) => {
//   try {
//     // Find the user with the given username
//     const user = await User.findOne({ where: { username: req.body.username } });
//   }


//     // Check if the user exists and the password is correct
// // } });
module.exports = router;