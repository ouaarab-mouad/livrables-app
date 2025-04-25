const express = require('express');
const router = express.Router();

const etudiantController = require('../controllers/etudiantController');
const authMiddleware = require('../middlewares/auth');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.get('/', authMiddleware.ensureAuthenticated, etudiantController.listEtudiants);
router.post('/:id/delete', authMiddleware.ensureAuthenticated, etudiantController.deleteEtudiant);
router.get('/add', authMiddleware.ensureAuthenticated, etudiantController.showAddForm);

// Handle add submission
router.post('/', authMiddleware.ensureAuthenticated, etudiantController.addEtudiant);
router.get('/:id/edit', authMiddleware.ensureAuthenticated, etudiantController.showEditForm);
router.put('/:id', authMiddleware.ensureAuthenticated, etudiantController.updateEtudiant);

module.exports = router;