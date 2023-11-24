const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

// Import your models as needed
const { Post, User, Comment } = require('../models');

// View a specific blog post
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the selected blog post and its comments
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }, Comment],
    });

    // Render the post page with the selected post
    res.render('post', { post, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more post routes (create, update, delete) as needed

module.exports = router;