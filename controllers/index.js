const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeController');
const dashboardRoutes = require('./dashboardController');

router.use('/', homeRoutes);
router.use('dashboard', dashboardRoutes)

router.use('/api', apiRoutes);

module.exports = router;