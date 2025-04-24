const { Book } = require('../models');

// Créer un livre
exports.createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//  Récupérer un seul livre par ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
//  Modifier un livre
exports.updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, year } = req.body;
  
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
  
      await book.update({ title, author, year });
      return res.status(200).json({ message: 'Livre mis à jour', book });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  // Supprimer un livre
exports.deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await Book.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: 'Livre non trouvé' });
      }
  
      return res.status(200).json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
