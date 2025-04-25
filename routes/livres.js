const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.ensureAuthenticated, livreController.listLivres);
router.get('/add', authMiddleware.ensureAuthenticated, livreController.showAddForm);
router.post('/', authMiddleware.ensureAuthenticated, livreController.addLivre);
router.post('/:id/delete', authMiddleware.ensureAuthenticated, livreController.deleteLivre);
router.get('/:id/edit', authMiddleware.ensureAuthenticated, livreController.showEditForm);
router.put('/:id', authMiddleware.ensureAuthenticated, livreController.updateLivre);

module.exports = router;