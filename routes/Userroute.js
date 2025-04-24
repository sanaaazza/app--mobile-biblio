const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET profil utilisateur par ID
router.get('/:id', UserController.getUserProfile);

// PUT mettre à jour nom ou mot de passe
router.put('/:id', UserController.updateUserProfile);

module.exports = router;
