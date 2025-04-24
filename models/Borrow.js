// models/borrow.js
module.exports = (sequelize, DataTypes) => {
    const Borrow = sequelize.define('Borrow', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      borrowDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    Borrow.associate = (models) => {
      // Un emprunt appartient à un utilisateur
      Borrow.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
  
      // Un emprunt appartient à un livre
      Borrow.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book',
      });
    };
  
    return Borrow;
  };
  