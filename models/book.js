// models/book.js
module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Book.associate = (models) => {
      // Un livre peut être emprunté plusieurs fois
      Book.hasMany(models.Borrow, {
        foreignKey: 'bookId',
        as: 'borrows',
      });
    };
  
    return Book;
  };
  