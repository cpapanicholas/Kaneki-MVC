const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

// Import your models as needed
const { Post, User, Comment } = require('../models');

// Dashboard route (requires authentication)
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    // Fetch blog posts created by the authenticated user
    const userPosts = await Post.findAll({
      where: { userId: req.session.user.id },
      include: [{ model: User, attributes: ['username'] }, Comment],
    });

    // Render the dashboard with user's posts
    res.render('dashboard', { userPosts, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more dashboard routes (create, update, delete) as needed

module.exports = router;