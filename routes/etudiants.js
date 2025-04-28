const express = require('express');
const router = express.Router();

const etudiantController = require('../controllers/etudiantController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
router.get('/', etudiantController.listEtudiants);
router.post('/:id/delete', etudiantController.deleteEtudiant);
router.get('/add', etudiantController.showAddForm);

// Handle add submission
router.post('/', etudiantController.addEtudiant);
router.get('/:id/edit', etudiantController.showEditForm);
router.put('/:id', etudiantController.updateEtudiant);

module.exports = router;