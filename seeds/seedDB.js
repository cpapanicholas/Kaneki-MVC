const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connections');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
  // Sync the models with the database
  await sequelize.sync({ force: true });

  // Seed users
  const hashedPassword = await bcrypt.hash('password123', 10); // Change this to your desired default password
  const users = await User.bulkCreate([
    { name: 'jon', email: 'alias@mail.co', username: 'user1', password: hashedPassword },
    { name: 'gary', email: 'aliaz@mailz.com', username: 'user2', password: hashedPassword },
  ]);

  // Seed posts
  const posts = await Post.bulkCreate([
    { title: 'First Post', content: 'This is the content of the first post.', userId: users[0].id },
    { title: 'Second Post', content: 'This is the content of the second post.', userId: users[1].id },
  ]);

  // Seed comments
  await Comment.bulkCreate([
    { text: 'Great post!', userId: users[1].id, postId: posts[0].id },
    { text: 'Nice content!', userId: users[0].id, postId: posts[1].id },
  ]);

  console.log('Database seeded successfully.');

  // Close the Sequelize connection
  sequelize.close();
};

// Run the seed function
seedDatabase();