

const { Sequelize, DataTypes } = require('sequelize');


// Créer une instance de Sequelize pour se connecter à la base de données
const sequelize = new Sequelize('mysql://root:1147896325@localhost:3306/book_app_db');

// Importer les modèles
const User = require('./user')(sequelize, DataTypes);
const Book = require('./book')(sequelize, DataTypes);
const Borrow = require('./Borrow')(sequelize, DataTypes);

// Configurer les associations
User.associate({ Borrow, Book });
Book.associate({ Borrow, User });
Borrow.associate({ User, Book });

// Synchroniser la base de données
sequelize.sync({ force: false }).then(() => {
  console.log("Les tables ont été synchronisées avec succès.");
}).catch((error) => {
  console.error("Erreur de synchronisation : ", error);
});

// Exporter les modèles
module.exports = { sequelize, User, Book, Borrow };
// async function createSampleData() {
//   // Création d’un utilisateur
//   const user = await User.create({
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     password:'12345'
//   });
//   const book = await Book.create({ title: '1984', author: 'George Orwell', year:'2005' });
//   await Borrow.create({ UserId: user.id, BookId: book.id, borrowDate: new Date() });
// }

sequelize.sync({ force: false }).then(async () => {
  console.log("Les tables sont synchronisées");
  // await createSampleData(); // ajoute quelques données
});

  