// controllers/dashboardController.js
const { Post, User } = require('../models');

const dashboardController = {
  // Display the user's dashboard
  async displayDashboard(req, res) {
    try {
      // Fetch blog posts created by the authenticated user
      const userPosts = await Post.findAll({
        where: { userId: req.session.user.id },
      });

      // Render the dashboard view with user's posts
      res.render('dashboard', { userPosts, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Render the form to create a new blog post
  renderNewPostForm(req, res) {
    // Render the form view
    res.render('new-post', { user: req.session.user });
  },

  // Handle the creation of a new blog post
  async createNewPost(req, res) {
    try {
      // Extract post data from the request body
      const { title, content } = req.body;

      // Create a new post associated with the authenticated user
      const newPost = await Post.create({
        title,
        content,
        userId: req.session.user.id,
      });

      // Redirect to the updated dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Render the form to edit an existing blog post
  async renderEditPostForm(req, res) {
    try {
      // Fetch the selected post
      const post = await Post.findByPk(req.params.id);

      // Render the edit form view
      res.render('edit-post', { post, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Handle the update of an existing blog post
  async updatePost(req, res) {
    try {
      // Extract updated post data from the request body
      const { title, content } = req.body;

      // Update the selected post
      await Post.update(
        { title, content },
        { where: { id: req.params.id, userId: req.session.user.id } }
      );

      // Redirect to the updated dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Handle the deletion of an existing blog post
  async deletePost(req, res) {
    try {
      // Delete the selected post
      await Post.destroy({
        where: { id: req.params.id, userId: req.session.user.id },
      });

      // Redirect to the updated dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = dashboardController;
