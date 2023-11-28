const express = require('express');
const router = express.Router();

// Import your models as needed
const { Post, User, Comment } = require('../../models');

// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch existing blog posts from the database
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }, Comment],
    });

    // Render the home page with the posts
    res.render('home', { posts, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;