const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');

router.get('/', livreController.listLivres);
router.get('/add', livreController.showAddForm);
router.post('/', livreController.addLivre);
router.post('/:id/delete', livreController.deleteLivre);
router.get('/:id/edit', livreController.showEditForm);
router.put('/:id', livreController.updateLivre);

module.exports = router;