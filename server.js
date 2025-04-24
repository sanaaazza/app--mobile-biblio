// server.js
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// Importation des routes
const authRoutes = require('./routes/Authroute');
const bookRoutes = require('./routes/Bookroute');
const borrowRoutes = require('./routes/borrowRoutes');
const userRoutes = require('./routes/Userroute');

// Utilisation des routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrows', borrowRoutes);
app.use('/api/users', userRoutes);

// Récupération des modèles et de sequelize
const { sequelize, User, Book, Borrow } = require('./models');

// Fonction pour créer un admin par défaut
async function createDefaultAdmin() {
  const adminEmail = 'admin@admin.com';

  await User.create({
  name: 'Admin',
  email: adminEmail,
  password: 'admin123',
  role: 'admin'
   });

  console.log('Admin créé par défaut');
}

// Fonction pour synchroniser la base et recréer les tables
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelize.sync({ force: false });
    console.log('Base de données supprimée et recréée.');

    await createDefaultAdmin();

  } catch (error) {
    console.error('Erreur de connexion :', error);
  }
}

testConnection();

app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${port}`);
});

