const { Post } = require('../models');

const homeController = {
  // Display the homepage with existing blog posts
  async displayHomePage(req, res) {
    try {
      // Fetch all blog posts
      const allPosts = await Post.findAll();

      // Render the homepage view with existing blog posts
      res.render('home', { posts: allPosts, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Redirect to the homepage
  redirectToHomePage(req, res) {
    res.redirect('/');
  },
};

module.exports = homeController;