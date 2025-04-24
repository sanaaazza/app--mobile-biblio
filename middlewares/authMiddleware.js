const jwt = require('jsonwebtoken');

module.exports = (role = 'user') => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  // L'utilisateur authentifié est ajouté dans la requête

      // Vérification du rôle (si le rôle dans le token ne correspond pas)
      if (role === 'admin' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès interdit, rôle insuffisant' });
      }

      next();  // Si le rôle est correct, on passe à la suite
    } catch (error) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }
  };
};