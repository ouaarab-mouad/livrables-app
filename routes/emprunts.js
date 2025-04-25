const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.ensureAuthenticated, empruntController.listEmprunts);
router.get('/add', authMiddleware.ensureAuthenticated, empruntController.showAddForm);
router.post('/', authMiddleware.ensureAuthenticated, empruntController.addEmprunt);
router.post('/:id/return', authMiddleware.ensureAuthenticated, empruntController.returnBook);

module.exports = router;