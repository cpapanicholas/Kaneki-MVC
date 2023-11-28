const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const dashboardRoutes =require('./dashboardRoutes');
const authenticationRoutes =require('./authenticationRoutes');
const homeRoutes =require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/authentication', authenticationRoutes);

module.exports = router;