const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const authMiddleware = require('../middlewares/auth');

router.get('/home', authMiddleware.ensureAuthenticated, homeController.getDashboard);

module.exports = router;