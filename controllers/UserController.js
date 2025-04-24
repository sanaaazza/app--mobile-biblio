const bcrypt = require('bcrypt');
const { User } = require('../models');

// Récupérer les infos d’un utilisateur (par ID)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email'] // Ne pas retourner le mot de passe
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Mettre à jour le profil de l'utilisateur
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour le nom si fourni
    if (name) {
      user.name = name;
    }

    // Mettre à jour le mot de passe si fourni
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res.status(200).json({ message: 'Profil mis à jour avec succès.' });
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
