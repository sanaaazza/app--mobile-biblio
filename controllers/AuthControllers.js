const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Fonction d'inscription
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé." });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur avec le rôle par défaut 'user'
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", // Rôle par défaut 'user'
    });

    res.status(201).json({ message: "Utilisateur inscrit avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Fonction de connexion
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Mot de passe incorrect." });

    // Crée un token (en utilisant un secret plus sécurisé)
    const token = jwt.sign(
      { id: user.id, role: user.role }, // Inclut le rôle dans le payload
      process.env.JWT_SECRET || "default_secret", // Assure-toi que JWT_SECRET est défini dans ton fichier .env
      { expiresIn: "24h" }
    );

    // Renvoie le token et le rôle
    res.json({
      message: "Connexion réussie.",
      token,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { signup, login };
