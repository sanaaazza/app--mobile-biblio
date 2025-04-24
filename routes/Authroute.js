const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/AuthControllers');
const auth = require('../middlewares/authMiddleware');
// Route pour l'inscription
router.post('/signup', signup);

// Route pour la connexion
router.post('/login', login);

module.exports = router;
