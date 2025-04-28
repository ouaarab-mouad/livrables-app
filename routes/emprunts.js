const express = require('express');
const router = express.Router();
const empruntController = require('../controllers/empruntController');

router.get('/', empruntController.listEmprunts);
router.get('/add', empruntController.showAddForm);
router.post('/', empruntController.addEmprunt);
router.post('/:id/return', empruntController.returnBook);

module.exports = router;