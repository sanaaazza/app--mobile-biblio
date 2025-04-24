const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookControllers');
const auth = require('../middlewares/authMiddleware');


//  Ajouter un livre
router.post('/',auth('admin'), BookController.createBook);

//  Récupérer tous les livres
router.get('/', BookController.getAllBooks);

//  Récupérer un livre par ID
router.get('/:id', BookController.getBookById);
// Modifier un livre
router.put('/:id',auth('admin'), BookController.updateBook);

// Supprimer un livre
router.delete('/:id',auth('admin'), BookController.deleteBook);

module.exports = router;
