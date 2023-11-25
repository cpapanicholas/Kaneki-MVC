// controllers/postController.js
const { Post, Comment, User } = require('../models');

const postController = {
  // Display details of a single blog post
  async displayPostDetails(req, res) {
    try {
      // Fetch the selected post along with its associated user and comments
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, include: [{ model: User, attributes: ['username'] }] },
        ],
      });

      if (!post) {
        // If the post is not found, render an error page or redirect as needed
        return res.status(404).render('error', { message: 'Post not found' });
      }

      // Render the post details view with the post, user, and comments
      res.render('post-details', { post, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Handle the creation of a new comment on a post
  async createComment(req, res) {
    try {
      // Extract comment text from the request body
      const { text } = req.body;

      // Create a new comment associated with the authenticated user and the selected post
      await Comment.create({
        text,
        userId: req.session.user.id,
        postId: req.params.id,
      });

      // Redirect back to the post details page
      res.redirect(`/post/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Handle the deletion of a comment on a post
  async deleteComment(req, res) {
    try {
      // Delete the selected comment
      await Comment.destroy({
        where: { id: req.params.commentId, userId: req.session.user.id },
      });

      // Redirect back to the post details page
      res.redirect(`/post/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = postController;
